import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Container, CssBaseline, Paper, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { productEditSchema, type ProductEdit } from "./productSchema";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [resetCount, setResetCount] = useState(0);
  const [preview, setPreview] = useState<ProductEdit | null>(null);
  const theme = useMemo(() => createTheme({
    palette: { mode, primary: { main: mode === "light" ? "#1e40af" : "#b9c7ff" }, background: { default: mode === "light" ? "#f8fafc" : "#0b1220", paper: mode === "light" ? "#ffffff" : "#172033" } },
    typography: { fontFamily: '"DM Sans", sans-serif', h1: { fontFamily: '"Manrope", sans-serif', fontWeight: 750 } },
    shape: { borderRadius: 12 },
    components: { MuiButton: { defaultProps: { disableRipple: true }, styleOverrides: { root: { minHeight: 44, textTransform: "none", "&:focus-visible": { outline: "2px solid currentColor", outlineOffset: 3 } } } } },
  }), [mode]);
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm<ProductEdit>({
    resolver: zodResolver(productEditSchema), defaultValues: { name: "Studio Desk Lamp", stock: 12 },
  });
  useEffect(() => { if (resetCount > 0) setFocus("name"); }, [resetCount, setFocus]);
  const { ref: nameRef, ...nameField } = register("name");
  const { ref: stockRef, ...stockField } = register("stock", { valueAsNumber: true });

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 3, sm: 7 } }}>
      <Typography variant="overline" color="primary" sx={{ letterSpacing: 2, fontWeight: 700 }}>CATALOG STUDIO · COMPARISON</Typography>
      <Typography component="h1" variant="h1" sx={{ fontSize: { xs: 30, sm: 38 }, mt: 1 }}>The same product, different controls.</Typography>
      <Typography sx={{ mt: 2, color: "text.secondary" }}>This separate example previews form values locally. It does not call the catalog API.</Typography>
      <Button type="button" variant="outlined" sx={{ my: 3 }} onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode === "light" ? "Use dark theme" : "Use light theme"}
      </Button>
      <Paper component="section" elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: 1, borderColor: "divider" }}>
        <Typography component="h2" variant="h6" sx={{ mb: 3 }}>Product preview</Typography>
        <Box component="form" noValidate aria-label="Product preview" onSubmit={handleSubmit(setPreview)}>
          <Stack spacing={3}>
            <TextField id="mui-product-name" label="Product name" {...nameField} inputRef={nameRef} error={Boolean(errors.name)} helperText={errors.name?.message ?? "Use 2–60 characters."} slotProps={{ formHelperText: { role: errors.name ? "alert" : undefined } }} fullWidth />
            <TextField id="mui-product-stock" label="Stock" type="number" {...stockField} inputRef={stockRef} error={Boolean(errors.stock)} helperText={errors.stock?.message ?? "Whole units, 0–9999."} slotProps={{ htmlInput: { min: 0, max: 9999, step: 1 }, formHelperText: { role: errors.stock ? "alert" : undefined } }} fullWidth />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button type="submit" variant="contained">Preview product</Button>
              <Button type="button" variant="outlined" onClick={() => { reset(); setPreview(null); setResetCount((value) => value + 1); }}>Reset preview</Button>
            </Stack>
          </Stack>
        </Box>
        {preview && <Alert severity="success" sx={{ mt: 3 }} role="status">Preview: {preview.name} · {preview.stock} units. No server save.</Alert>}
      </Paper>
    </Container>
  </ThemeProvider>;
}
