from django.db import models


class Configuracao(models.Model):
    """Dados editáveis da página. Mantenha apenas um registro."""
    ano_matricula = models.PositiveIntegerField("Ano das matrículas", default=2027)
    titulo = models.CharField("Título do convite", max_length=120, default="Sua vez de ser aluno em 2027")
    mensagem = models.TextField(
        "Mensagem do convite",
        default="A Palavra de Deus transforma vidas. Venha estudar, crescer e ser treinado no Rhema.")
    link_pre_matricula = models.URLField("Link do formulário de pré-matrícula", blank=True)
    whatsapp = models.CharField("WhatsApp com DDD (só números)", max_length=20, blank=True,
                                help_text="Ex.: 5583999999999")
    mensagem_whatsapp = models.CharField("Mensagem inicial do WhatsApp", max_length=200,
                                         default="Olá! Gostaria de mais informações sobre o Rhema.")

    class Meta:
        verbose_name = "Configuração da página"
        verbose_name_plural = "Configuração da página"

    def __str__(self):
        return "Configuração da página"


class Testemunho(models.Model):
    nome_aluno = models.CharField("Nome do aluno", max_length=100)
    titulo = models.CharField("Título do vídeo", max_length=140)
    video_url = models.URLField("Link do vídeo (YouTube ou Instagram)")
    ordem = models.PositiveIntegerField(default=0)
    ativo = models.BooleanField(default=True)

    class Meta:
        ordering = ["ordem", "id"]

    def __str__(self):
        return f"{self.nome_aluno} – {self.titulo}"
