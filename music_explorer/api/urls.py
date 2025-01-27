from django.urls import path

from .controllers.matrix_controller import GetSimilarityMatrixView

from .controllers.genre_controller import GetAllGenresView

from .controllers.strategy_controller import ALittleCuriousStrategy, RandomStrategy, SmoothTransitionRandomStrategy, TakeMeAwayStrategy
from .views import UserView
from .views import CreateUserView

urlpatterns = [
    path('get_user', UserView.as_view()),
    path('create_user', CreateUserView.as_view()),
    path('random', RandomStrategy.as_view()),
    path('tma', TakeMeAwayStrategy.as_view()),
    path('alc', ALittleCuriousStrategy.as_view()),
    path('st', SmoothTransitionRandomStrategy.as_view()),
    path('get_all_genres', GetAllGenresView.as_view()),
    path('get_matrix', GetSimilarityMatrixView.as_view()),

]
