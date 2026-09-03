# Floreix

Rèplica bilingüe de la web pública `floreix.com`, amb la versió catalana com a font de veritat.

## Estructura

- `/` — Inici (CA)
- `/psicoterapia/`
- `/terapia-a-la-natura/`
- `/about/`
- `/metodologia/`
- `/contact/`
- `/privacy-policy/`
- `/es/` — Inicio (ES)
- `/es/psicoterapia/`
- `/es/terapia-en-la-naturaleza/`
- `/es/sobre-nosotros/`
- `/es/metodologia/`
- `/es/contacto/`
- `/es/terminos-y-condiciones/`

## Fidelitat amb el lloc original

El sistema visual reprodueix el template Love Nature/Astra utilitzat pel lloc actual i empra els assets originals de Floreix.

Per a les pàgines catalanes que el crawler extern no pot recuperar de manera estable, `assets/live-page.js` consulta la REST API pública de WordPress i injecta `content.rendered` de la pàgina actual juntament amb el CSS d'Elementor corresponent. Si la REST API no està disponible, es conserva un fallback estàtic construït únicament amb contingut verificat.

La versió castellana no reutilitza el contingut de la versió ES antiga de WordPress: parteix del contingut català i utilitza rutes netes i equivalents.

## Desenvolupament local

És un lloc estàtic. Des de l'arrel del repositori es pot servir, per exemple, amb:

```bash
python3 -m http.server 8080
```

I obrir `http://localhost:8080/`.

## Auditoria

Vegeu `AUDIT.md` per a l'inventari de rutes, textos verificats, assets i decisions de rèplica.
