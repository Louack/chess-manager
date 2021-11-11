from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from core.exceptions import APIException400

from apps.players.models import Player
from apps.user_profiles.models import Profile


class Tournament(models.Model):
    creator = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE,
        blank=False,
        null=True
    )
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    name = models.CharField(
        max_length=70,
        blank=False,
        null=False
    )
    total_rounds = models.IntegerField(
        default=4,
        editable=False
    )
    finished_rounds = models.IntegerField(
        default=0,
        editable=False
    )
    players_list = ArrayField(
        base_field=models.IntegerField(
            blank=True,
        ),
        blank=True,
        default=list,
        size=8,
    )
    open = models.BooleanField(
        editable=False,
        default=True,
        blank=True,
        null=True
    )
    on_going = models.BooleanField(
        editable=False,
        default=False,
        blank=True,
        null=True
    )
    completed = models.BooleanField(
        editable=False,
        default=False,
        blank=True,
        null=True
    )
    locked = models.BooleanField(
        default=False,
        blank=True,
        null=True
    )
    created = models.BooleanField(
        editable=False,
        default=False,
        blank=True,
        null=True
    )
    tournament_date = models.DateField(
        blank=True,
        null=True
    )
    date_created = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'Tournament'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_locked = self.locked
        self.__original_finished_rounds = self.finished_rounds

    def __str__(self):
        return self.name

    def add_tournament_number(self):
        if not self.number:
            self.creator.tournaments_created += 1
            self.creator.save()
            self.number = self.creator.tournaments_created

    def check_players_list(self):
        players_do_not_exist = []
        previous_player_ids = []
        for player_id in self.players_list:
            if player_id in previous_player_ids:
                raise APIException400('The same ID is present several times')
            previous_player_ids.append(player_id)
            try:
                Player.objects.get(
                    creator=self.creator,
                    number=player_id
                )
            except ObjectDoesNotExist:
                players_do_not_exist.append(player_id)
        if players_do_not_exist:
            raise APIException400('The following player IDs do '
                               f'not exist: {players_do_not_exist}')

    def create_round_or_end_tournament(self):
        if self.finished_rounds < self.total_rounds:
            new_round = Round.objects.create(
                number=self.finished_rounds + 1,
                tournament=self,
            )
            new_round.initialize_matches()
        else:
            self.on_going = False
            self.completed = True
            self.finalize_tournament()
        super().save()

    def handle_first_save(self):
        self.created = True
        self.check_players_list()
        if self.locked:
            self.lock_tournament()
        self.add_tournament_number()
        super().save()

    def handle_lock_at_update(self):
        if self.locked and not self.__original_locked:
            self.lock_tournament()
        elif self.locked and self.__original_locked:
            self.check_finished_rounds_update()
        elif not self.locked and not self.__original_locked:
            super().save()
        else:
            raise APIException400('A locked tournament cannot be modified')

    def handle_tournament_update(self):
        self.check_players_list()
        self.handle_lock_at_update()

    def lock_tournament(self):
        if len(self.players_list) == 8:
            self.open = False
            self.on_going = True
            super().save()
            self.add_participants()
            self.create_round_or_end_tournament()
        else:
            raise APIException400('The players list is incomplete')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if not self.created:
            self.handle_first_save()
        else:
            self.handle_tournament_update()

    def check_finished_rounds_update(self):
        if self.finished_rounds != self.__original_finished_rounds:
            self.create_round_or_end_tournament()
        else:
            raise APIException400('A locked tournament cannot be modified')

    def add_participants(self):
        for number, player_id in enumerate(self.players_list, 1):
            player = Player.objects.get(number=player_id)
            Participant.objects.create(
                number=number,
                tournament=self,
                player=player,
                rank=player.rank
            )

    def get_participants(self):
        participants = [
            participant for participant in Participant.objects.filter(
                tournament=self
            )
        ]
        return participants

    def finalize_tournament(self):
        sorted_participants = self.sort_participants()
        players = [participant.player for participant in sorted_participants]
        for place, player in enumerate(players, 1):
            player.calcultate_new_average_place(place)
            player.tournaments_played += 1
            if place == 1:
                player.tournaments_won += 1
            player.save()
        self.define_new_ranks()

    def sort_participants(self, numbers=False):
        participants = self.get_participants()
        sorted_participants = sorted(
            participants, key=lambda participant: (
                -participant.total_points,
                participant.rank
            )
        )
        sorted_participant_numbers = [
            participant.number for participant in sorted_participants
        ]
        if numbers:
            return sorted_participant_numbers
        else:
            return sorted_participants

    def define_new_ranks(self):
        players = [player for player
                   in Player.objects.filter(creator=self.creator)]
        sorted_players = sorted(
            players, key=lambda player: (
                - bool(player.avg_place),
                player.avg_place,
                - player.tournaments_played,
                player.date_created
            ),
        )
        for rank, player in enumerate(sorted_players, 1):
            player.rank = rank
            player.save()


class Round(models.Model):
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    tournament = models.ForeignKey(
        to=Tournament,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    finished_matches = models.IntegerField(
        default=0,
        editable=False,
        blank=True,
        null=True
    )
    participants_pairs = ArrayField(
        base_field=ArrayField(
            base_field=models.IntegerField(
                editable=False
            ),
            editable=False,
            size=2,
            default=list,
        ),
        editable=False,
        default=list,
    )

    class Meta:
        verbose_name = 'Round'

    def __str__(self):
        return f'Round {self.number}'

    def initialize_matches(self):
        self.participants_pairs = self.match_participants()
        self.save()
        for number, pair in enumerate(self.participants_pairs, 1):
            Match.objects.create(
                number=number,
                tournament=self.tournament,
                round=self,
                number_participant_1=pair[0],
                number_participant_2=pair[1],
            )

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        participants = self.tournament.get_participants()
        matches_number = len(participants) // 2
        if self.finished_matches == matches_number:
            self.tournament.finished_rounds += 1
            self.tournament.save()
        super().save()

    def match_participants(self):
        pairs_list = []
        sorted_participants = self.tournament.sort_participants(numbers=True)
        if self.number == 1:
            pairs_list = self.get_first_round_pairs(
                pairs_list,
                sorted_participants
            )
        else:
            pairs_list = self.get_last_rounds_pairs(
                pairs_list,
                sorted_participants
            )
        return pairs_list

    @staticmethod
    def get_first_round_pairs(pairs_list, participants):
        half = len(participants) // 2
        for i in range(half):
            pair = [
                participants[i],
                participants[i + half]
            ]
            pairs_list.append(pair)
        return pairs_list

    def get_last_rounds_pairs(self, pairs_list, participants):
        previous_pairs = self.get_previous_participants_pairs()
        n = 1
        try:
            while len(participants) > 0:
                pair = [
                    participants[0],
                    participants[0 + n]
                ]
                if pair in previous_pairs or pair[::-1] in previous_pairs:
                    n += 1
                else:
                    pairs_list.append(pair)
                    participants = [participant for participant in participants
                                    if participant not in pair]
                    n = 1
        except IndexError:
            pairs_list.append(
                participants[0],
                participants[1]
            )
        return pairs_list

    def get_previous_participants_pairs(self):
        previous_participants_pairs = []
        for number in range(1, self.number):
            round_obj = Round.objects.get(
                number=number,
                tournament=self.tournament
            )
            previous_participants_pairs.extend(round_obj.participants_pairs)
        return previous_participants_pairs


class Match(models.Model):
    RESULT_CHOICES = (
        (0.0, 0.0),
        (0.5, 0.5),
        (1.0, 1.0)
    )
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    tournament = models.ForeignKey(
        to=Tournament,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    round = models.ForeignKey(
        to=Round,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    played = models.BooleanField(
        default=False,
        blank=True,
        null=True
    )
    number_participant_1 = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    result_participant_1 = models.FloatField(
        blank=True,
        null=True,
        choices=RESULT_CHOICES
    )
    number_participant_2 = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    result_participant_2 = models.FloatField(
        blank=True,
        null=True,
        choices=RESULT_CHOICES
    )

    class Meta:
        verbose_name = 'Match'
        verbose_name_plural = 'Matches'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_played = self.played

    def __str__(self):
        return f'Match {self.number}'

    def check_results(self):
        if self.result_participant_1 and self.result_participant_2:
            res_sum = self.result_participant_1 + self.result_participant_2
            if res_sum != 1:
                raise APIException400('Points sum must be equal to 1.')

    def finalize_match(self):
        if type(self.result_participant_1 and
                self.result_participant_2) == float:
            self.update_participants_total_points()
            self.round.finished_matches += 1
            self.round.save()
        else:
            raise APIException400('Results must be entered before locking.')

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        if self.__original_played:
            raise APIException400('Match has already been played.')
        else:
            self.check_results()
            if self.played:
                self.finalize_match()
            super().save()

    def update_participants_total_points(self):
        results = (
            {
                "participant_number": self.number_participant_1,
                "point": self.result_participant_1
            },
            {
                "participant_number": self.number_participant_2,
                "point": self.result_participant_2
            }
        )
        for result in results:
            participant = Participant.objects.get(
                tournament=self.tournament,
                number=result["participant_number"]
            )
            participant.total_points += result["point"]
            participant.save()


class Participant(models.Model):
    number = models.IntegerField(
        editable=False,
        blank=True,
        null=True
    )
    tournament = models.ForeignKey(
        to=Tournament,
        on_delete=models.CASCADE,
        editable=False,
        blank=False,
        null=False
    )
    player = models.ForeignKey(
        to=Player,
        on_delete=models.PROTECT,
        editable=False,
        blank=False,
        null=False
    )
    rank = models.IntegerField(
        editable=False,
        blank=True,
        null=True,
    )
    total_points = models.FloatField(
        default=0,
        editable=False,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = 'Participant'

    def __str__(self):
        return f'Participant {self.number}'
