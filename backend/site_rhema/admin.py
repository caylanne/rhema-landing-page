from django.contrib import admin
from .models import Configuracao, Testemunho

admin.site.register(Configuracao)

@admin.register(Testemunho)
class TestemunhoAdmin(admin.ModelAdmin):
    list_display = ("nome_aluno", "titulo", "ordem", "ativo")
    list_editable = ("ordem", "ativo")
