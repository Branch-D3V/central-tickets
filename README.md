# 🎬 Urach Video Front

Frontend do projeto **Urach Video**, desenvolvido com **Next.js (App Router)** e **Chakra UI v3**, focado em performance, experiência premium e controle de acesso a conteúdo adulto (+18).

---

## 🚀 Tecnologias Principais

- **Next.js 16 (App Router)**
- **React 19**
- **Chakra UI v3**
- **Framer Motion**
- **React Hook Form + Yup**
- **Nookies**
- **Next Themes**

---

## 🛠️ Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 🔞 Controle de Acesso +18

O projeto utiliza um **Age Validator** com as seguintes regras:

- Modal obrigatório ao acessar o site
- Bloqueio de clique fora e tecla ESC
- Botões:
  - Tenho +18 anos – Entrar
  - Não tenho +18 anos – Sair
- Consentimento salvo em cookie por **30 minutos** (nookies)
- Caso clique em “Sair”, o site exibe mensagem de bloqueio permanente

---

## 🔐 Segurança Client-side

- Bloqueio de botão direito
- Bloqueio de atalhos do DevTools
- Desativação de drag em imagens

> Nenhuma proteção client-side é 100% segura.

---

## 🧱 Estrutura de Pastas

```bash
src/
 ├─ app/
 ├─ components/
 ├─ providers/
 ├─ data/
 ├─ hooks/
 ├─ utils/
 └─ styles/
```

---

## ▶️ Como rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 📄 Licença

Projeto privado.
