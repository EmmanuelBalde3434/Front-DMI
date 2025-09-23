import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, ArrowLeft } from "lucide-react-native";
import Header from "../components/Header";
import { useAuth } from "../auth/AuthContext";

const emailOk = (s: string) => /\S+@\S+\.\S+/.test(s);
const min6 = (s: string) => (s?.length || 0) >= 6;

const theme = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E5E7EB",
  text: "#0F172A",
  sub: "#64748B",
  primaryA: "#06B6D4",
  primaryB: "#0EA5E9",
  successA: "#10B981",
  successB: "#059669",
  danger: "#EF4444",
  link: "#2563EB",
  inputBg: "#F9FAFB",
};

type InputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  showError?: boolean;
  right?: React.ReactNode;
};
function Field({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  showError = false,
  right,
}: InputProps) {
  const borderColor = showError && error ? theme.danger : theme.border;
  return (
    <View style={{ gap: 6 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.inputBg,
          borderWidth: 1,
          borderColor,
          borderRadius: 14,
          paddingHorizontal: 12,
          height: 52,
          gap: 8,
        }}
      >
        <View style={{ width: 22 }}>{icon}</View>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={{ flex: 1, fontSize: 16, color: theme.text }}
          placeholderTextColor={theme.sub}
        />
        {right}
      </View>
      {showError && !!error && (
        <Text style={{ color: theme.danger, fontSize: 12 }}>{error}</Text>
      )}
    </View>
  );
}

function GradientButton({
  title,
  onPress,
  loading,
  variant = "primary",
  disabled,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "success";
  disabled?: boolean;
}) {
  const [a, b] =
    variant === "success" ? [theme.successA, theme.successB] : [theme.primaryA, theme.primaryB];

  return (
    <Pressable onPress={onPress} disabled={loading || disabled} style={{ opacity: loading || disabled ? 0.75 : 1 }}>
      <LinearGradient
        colors={[a, b]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          height: 52,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 2,
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={{ padding: 4, borderRadius: 10 }}>
      <ArrowLeft size={22} color="#fff" />
    </Pressable>
  );
}

export function LoginScreen({ goRegister }: { goRegister: () => void }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const emailError = emailOk(email) ? "" : "Ingresa un correo válido.";
  const passwordError = min6(password) ? "" : "La contraseña debe tener al menos 6 caracteres.";
  const valid = !emailError && !passwordError;

  const submit = async () => {
    setAttempted(true);
    if (!valid) return;
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert("No pudimos iniciar sesión", e?.message ?? "Revisa tus datos e inténtalo otra vez.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Inicia sesión" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 20,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.border,
              gap: 14,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "800", color: theme.text }}>¡Hola de nuevo!</Text>
            <Text style={{ color: theme.sub, marginBottom: 4 }}>
              Ingresa tus credenciales para continuar.
            </Text>

            <Field
              icon={<Mail size={20} color={theme.sub} />}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouchedEmail(true)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
              showError={touchedEmail || attempted}
            />

            <Field
              icon={<Lock size={20} color={theme.sub} />}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTouchedPassword(true)}
              secureTextEntry={!reveal}
              error={passwordError}
              showError={touchedPassword || attempted}
              right={
                <Pressable onPress={() => setReveal((v) => !v)} hitSlop={8}>
                  {reveal ? <EyeOff size={20} color={theme.sub} /> : <Eye size={20} color={theme.sub} />}
                </Pressable>
              }
            />

            <GradientButton title="Entrar" onPress={submit} loading={loading} disabled={!valid && attempted} />

            <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 6 }}>
              <Text style={{ color: theme.sub }}>¿Aún no tienes cuenta?</Text>
              <Pressable onPress={goRegister}>
                <Text style={{ color: theme.link, fontWeight: "700" }}>Crear cuenta</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function RegisterScreen({ goLogin }: { goLogin: () => void }) {
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const nameError = name.trim() ? "" : "Escribe tu nombre.";
  const emailError = emailOk(email) ? "" : "Ingresa un correo válido.";
  const passwordError = min6(password) ? "" : "La contraseña debe tener al menos 6 caracteres.";
  const valid = !nameError && !emailError && !passwordError;

  const submit = async () => {
    setAttempted(true);
    if (!valid) return;
    try {
      await register(name.trim(), email.trim(), password);
    } catch (e: any) {
      Alert.alert("No pudimos crear tu cuenta", e?.message ?? "Inténtalo otra vez en unos minutos.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Crear cuenta" left={<BackButton onPress={goLogin} />} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 20,
              padding: 18,
              borderWidth: 1,
              borderColor: theme.border,
              gap: 14,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "800", color: theme.text }}>Crea tu cuenta</Text>
            <Text style={{ color: theme.sub, marginBottom: 4 }}>
              Solo te tomará un minuto.
            </Text>

            <Field
              icon={<UserIcon size={20} color={theme.sub} />}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
              onBlur={() => setTouchedName(true)}
              autoCapitalize="words"
              error={nameError}
              showError={touchedName || attempted}
            />

            <Field
              icon={<Mail size={20} color={theme.sub} />}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouchedEmail(true)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
              showError={touchedEmail || attempted}
            />

            <Field
              icon={<Lock size={20} color={theme.sub} />}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTouchedPassword(true)}
              secureTextEntry={!reveal}
              error={passwordError}
              showError={touchedPassword || attempted}
              right={
                <Pressable onPress={() => setReveal((v) => !v)} hitSlop={8}>
                  {reveal ? <EyeOff size={20} color={theme.sub} /> : <Eye size={20} color={theme.sub} />}
                </Pressable>
              }
            />

            <GradientButton
              title="Registrarme"
              onPress={submit}
              loading={loading}
              variant="success"
              disabled={!valid && attempted}
            />

            <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 6 }}>
              <Text style={{ color: theme.sub }}>¿Ya tienes cuenta?</Text>
              <Pressable onPress={goLogin}>
                <Text style={{ color: theme.link, fontWeight: "700" }}>Inicia sesión</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function AuthStack() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return mode === "login" ? (
    <LoginScreen goRegister={() => setMode("register")} />
  ) : (
    <RegisterScreen goLogin={() => setMode("login")} />
  );
}
