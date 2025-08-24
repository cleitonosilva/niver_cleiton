# Configuração do EmailJS

## Passos para configurar o envio de emails:

### 1. Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita

### 2. Configurar Email Service
- Vá em "Email Services"
- Clique em "Add New Service"
- Escolha "Gmail" ou "Outlook"
- Conecte sua conta de email

### 3. Criar Email Template
- Vá em "Email Templates"
- Clique em "Create New Template"
- Use este template:

**Assunto:** Nova Confirmação de Presença - Aniversário do Cleiton

**Conteúdo:**
```
Nova confirmação de presença para o aniversário do Cleiton!

Nome: {{from_name}}
Número de pessoas: {{people_count}}
Crianças: {{children_count}}
Data do evento: {{event_date}}
Local: {{event_location}}

{{message}}

---
Enviado automaticamente pelo sistema de confirmação
```

### 4. Obter as Chaves
- **Public Key:** Vá em "Account" > "API Keys"
- **Service ID:** Copie o ID do seu Email Service
- **Template ID:** Copie o ID do seu Email Template

### 5. Atualizar o Código
Substitua no arquivo `src/components/BirthdayInvite.tsx`:

```javascript
// Linha 25: Substitua YOUR_PUBLIC_KEY
emailjs.init("sua_public_key_aqui");

// Linhas 58-60: Substitua YOUR_SERVICE_ID e YOUR_TEMPLATE_ID
await emailjs.send(
  'seu_service_id_aqui',
  'seu_template_id_aqui',
  templateParams
);
```

### 6. Testar
- Preencha o formulário
- Clique em "Confirmar Presença"
- Verifique se o email foi recebido em cleiton.dev.pt@gmail.com

## Informações do Email:
- **Destinatário:** cleiton.dev.pt@gmail.com
- **Conteúdo:** Lista completa das pessoas confirmadas
- **Formato:** Email automático com todos os detalhes
