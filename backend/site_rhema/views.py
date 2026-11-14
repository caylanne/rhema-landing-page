from urllib.parse import quote
from django.http import JsonResponse
from .models import Configuracao, Testemunho


def landing(request):
    cfg = Configuracao.objects.first() or Configuracao()
    contato = ""
    if cfg.whatsapp:
        contato = f"https://wa.me/{cfg.whatsapp}?text={quote(cfg.mensagem_whatsapp)}"
    return JsonResponse({
        "ano": cfg.ano_matricula,
        "titulo": cfg.titulo,
        "mensagem": cfg.mensagem,
        "link_pre_matricula": cfg.link_pre_matricula,
        "link_contato": contato,
        "testemunhos": [
            {"id": t.id, "aluno": t.nome_aluno, "titulo": t.titulo, "video": t.video_url}
            for t in Testemunho.objects.filter(ativo=True)
        ],
    })
