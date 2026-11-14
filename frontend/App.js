import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, Linking, Animated, Easing, useWindowDimensions, StyleSheet } from "react-native";
import { useFonts, CormorantGaramond_700Bold, CormorantGaramond_500Medium } from "@expo-google-fonts/cormorant-garamond";
import { NunitoSans_400Regular, NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { API_URL, FALLBACK } from "./src/config";
import { cor, fonte } from "./src/theme";
import Reveal from "./src/Reveal";
import Testemunhos from "./src/Testemunhos";

function Botao({ texto, href, principal, desativado }) {
  return (
    <Pressable
      accessibilityRole="link"
      disabled={desativado}
      onPress={() => href && Linking.openURL(href)}
      style={({ hovered, focused }) => [
        s.botao, principal ? s.botaoP : s.botaoS,
        (hovered || focused) && { opacity: 0.88 },
        desativado && { opacity: 0.45 },
      ]}
    >
      <Text style={[s.botaoTxt, principal ? { color: "#1A1205" } : { color: cor.ouroClaro }]}>{texto}</Text>
    </Pressable>
  );
}

export default function App() {
  const [ok] = useFonts({ CormorantGaramond_700Bold, CormorantGaramond_500Medium, NunitoSans_400Regular, NunitoSans_700Bold });
  const [d, setD] = useState(FALLBACK);
  const { width } = useWindowDimensions();
  const largo = width >= 860;
  const brilho = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch(API_URL).then((r) => r.json()).then(setD).catch(() => {});
    // brilho lento atrás do selo
    Animated.loop(Animated.sequence([
      Animated.timing(brilho, { toValue: 1, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(brilho, { toValue: 0, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ])).start();
  }, []);

  if (!ok) return <View style={{ flex: 1, backgroundColor: cor.noite }} />;
  const pad = largo ? 64 : 24;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: cor.noite }} contentContainerStyle={{ alignItems: "center" }}>
      {/* CONVITE */}
      <View style={[s.faixa, { paddingHorizontal: pad, paddingTop: largo ? 72 : 40, paddingBottom: largo ? 96 : 64 }]}>
        <View style={[s.hero, largo && { flexDirection: "row", alignItems: "center" }]}>
          <View style={[s.selo, largo && { marginRight: 64 }]}>
            <Animated.View style={[s.halo, { opacity: brilho.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.5] }) }]} />
            <Image source={require("./assets/logo.png")} style={s.logo} accessibilityLabel="Selo do Rhema, Centro de Treinamento Bíblico" />
          </View>
          <View style={{ flex: largo ? 1 : undefined, marginTop: largo ? 0 : 32 }}>
            <Reveal delay={200}><Text style={[s.h1, { fontSize: largo ? 64 : 42, lineHeight: largo ? 68 : 46 }]}>{d.titulo}</Text></Reveal>
            <Reveal delay={900}><Text style={s.lead}>{d.mensagem}</Text></Reveal>
            <Reveal delay={1600} style={s.botoes}>
              <Botao principal texto="Fazer pré-matrícula" href="#pre-matricula" />
              <Botao texto="Falar com a escola" href={d.link_contato} desativado={!d.link_contato} />
            </Reveal>
          </View>
        </View>
      </View>

      {/* TESTEMUNHOS */}
      <View style={[s.faixa, { backgroundColor: cor.noite2, paddingHorizontal: pad, paddingVertical: largo ? 88 : 56 }]}>
        <View style={s.coluna}>
          <Text style={s.h2}>Quem está concluindo conta o que viveu</Text>
          <Text style={[s.lead, { marginBottom: 40 }]}>Testemunhos de alunos que estão terminando a escola.</Text>
          <Testemunhos itens={d.testemunhos} largo={largo} />
        </View>
      </View>

      {/* PRÉ-MATRÍCULA */}
      <View nativeID="pre-matricula" style={[s.faixa, { paddingHorizontal: pad, paddingVertical: largo ? 88 : 56 }]}>
        <View style={[s.coluna, { alignItems: "center" }]}>
          <Text style={[s.h2, { textAlign: "center" }]}>Pré-matrícula {d.ano}</Text>
          <Text style={[s.lead, { textAlign: "center", maxWidth: 560 }]}>
            Preencha o formulário para garantir seu lugar. A equipe do Rhema entra em contato com os próximos passos.
          </Text>
          <View style={[s.botoes, { justifyContent: "center", marginTop: 8 }]}>
            <Botao principal texto="Abrir formulário de pré-matrícula" href={d.link_pre_matricula} desativado={!d.link_pre_matricula} />
          </View>
          <Text style={s.nota}>
            {d.link_pre_matricula ? "O formulário abre em uma nova página." : "O formulário será liberado em breve."}
          </Text>
        </View>
      </View>

      {/* CONTATO + RODAPÉ */}
      <View style={[s.faixa, { backgroundColor: cor.vinho, paddingHorizontal: pad, paddingVertical: 48 }]}>
        <View style={[s.coluna, largo && { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
          <View style={{ marginBottom: largo ? 0 : 24, flex: 1 }}>
            <Text style={[s.h2, { fontSize: 32, marginBottom: 6 }]}>Ficou com dúvida?</Text>
            <Text style={[s.lead, { color: "#EBD9D6", marginBottom: 0 }]}>Converse com alguém da escola e tire suas perguntas.</Text>
          </View>
          <Botao principal texto="Entrar em contato" href={d.link_contato} desativado={!d.link_contato} />
        </View>
      </View>
      <Text style={s.rodape}>Rhema · Centro de Treinamento Bíblico · A Palavra Falada</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  faixa: { width: "100%", alignItems: "center" },
  coluna: { width: "100%", maxWidth: 1080 },
  hero: { width: "100%", maxWidth: 1080 },
  selo: { alignItems: "center", justifyContent: "center", alignSelf: "center" },
  halo: { position: "absolute", width: 360, height: 360, borderRadius: 180, backgroundColor: cor.ouro },
  logo: { width: 300, height: 300, resizeMode: "contain" },
  h1: { fontFamily: fonte.titulo, color: cor.texto },
  h2: { fontFamily: fonte.titulo, color: cor.texto, fontSize: 40, lineHeight: 46, marginBottom: 12 },
  lead: { fontFamily: fonte.corpo, color: cor.suave, fontSize: 18, lineHeight: 28, marginTop: 20, marginBottom: 28, maxWidth: 600 },
  botoes: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  botao: { paddingVertical: 16, paddingHorizontal: 28, borderRadius: 4, alignItems: "center" },
  botaoP: { backgroundColor: cor.ouro },
  botaoS: { borderWidth: 1.5, borderColor: cor.ouro },
  botaoTxt: { fontFamily: fonte.corpoNegrito, fontSize: 16 },
  nota: { fontFamily: fonte.corpo, color: cor.suave, fontSize: 14, marginTop: 16 },
  rodape: { fontFamily: fonte.corpo, color: cor.suave, fontSize: 13, paddingVertical: 28, textAlign: "center" },
});
