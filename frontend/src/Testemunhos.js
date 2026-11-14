import React, { useState } from "react";
import { View, Text, Pressable, Linking, Platform, StyleSheet } from "react-native";
import { cor, fonte } from "./theme";

function youtubeId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function instagramId(url) {
  const m = url.match(/instagram\.com\/(?:reel|reels|p)\/([\w-]+)/);
  return m ? m[1] : null;
}

// Descobre como o vídeo toca dentro da página (só na web)
function embed(url) {
  const yt = youtubeId(url);
  if (yt) return { src: `https://www.youtube.com/embed/${yt}?autoplay=1&rel=0`, vertical: false };
  const ig = instagramId(url);
  if (ig) return { src: `https://www.instagram.com/reel/${ig}/embed`, vertical: true };
  return null;
}

function Cartao({ t, aberto, onToggle }) {
  const e = embed(t.video);
  const web = Platform.OS === "web" && e;
  const forma = e && e.vertical ? s.vertical : s.horizontal;
  return (
    <View style={s.cartao}>
      {aberto && web ? (
        <View style={[s.player, forma]}>
          {React.createElement("iframe", {
            src: e.src,
            title: t.titulo,
            allow: "autoplay; encrypted-media; picture-in-picture",
            allowFullScreen: true,
            style: { border: 0, width: "100%", height: "100%" },
          })}
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Assistir: ${t.titulo}, de ${t.aluno}`}
          onPress={() => (web ? onToggle() : Linking.openURL(t.video))}
          style={({ hovered, focused }) => [s.capa, forma, (hovered || focused) && s.capaAtiva]}
        >
          <View style={s.play}><Text style={s.playIcone}>▶</Text></View>
        </Pressable>
      )}
      <Text style={[s.aluno, e && e.vertical && s.centro]}>{t.aluno}</Text>
      <Text style={[s.tituloVideo, e && e.vertical && s.centro]}>{t.titulo}</Text>
    </View>
  );
}

export default function Testemunhos({ itens, largo }) {
  const [aberto, setAberto] = useState(null);
  if (!itens.length) {
    return <Text style={s.vazio}>Os testemunhos dos alunos serão publicados aqui em breve.</Text>;
  }
  return (
    <View style={[s.grade, largo && s.gradeLarga]}>
      {itens.map((t) => (
        <View key={t.id} style={largo ? s.colLarga : s.colCheia}>
          <Cartao t={t} aberto={aberto === t.id} onToggle={() => setAberto(t.id)} />
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  grade: { width: "100%" },
  gradeLarga: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -12 },
  colCheia: { width: "100%", marginBottom: 28 },
  colLarga: { width: "33.333%", paddingHorizontal: 12, marginBottom: 28, minWidth: 280 },
  cartao: { width: "100%" },
  horizontal: { aspectRatio: 16 / 9 },
  vertical: { aspectRatio: 9 / 14, width: "100%", maxWidth: 360, alignSelf: "center" },
  capa: { backgroundColor: "#0A1320", borderWidth: 1, borderColor: "#2A3D57", alignItems: "center", justifyContent: "center", borderRadius: 4 },
  capaAtiva: { borderColor: cor.ouro },
  play: { width: 64, height: 64, borderRadius: 32, backgroundColor: cor.vinho, borderWidth: 2, borderColor: cor.ouro, alignItems: "center", justifyContent: "center" },
  playIcone: { color: cor.ouroClaro, fontSize: 22, marginLeft: 4 },
  player: { backgroundColor: "#000", borderRadius: 4, overflow: "hidden" },
  aluno: { fontFamily: fonte.titulo, color: cor.ouroClaro, fontSize: 24, marginTop: 14 },
  tituloVideo: { fontFamily: fonte.corpo, color: cor.suave, fontSize: 15, marginTop: 2, lineHeight: 22 },
  centro: { textAlign: "center" },
  vazio: { fontFamily: fonte.corpo, color: cor.suave, fontSize: 16 },
});
