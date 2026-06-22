import React from 'react';

// Dados da lista baseados no wireframe de baixa fidelidade
const opcoesConfiguracao = [
  { id: 1, label: 'Perfil', supporting: 'Gerenciar suas informações pessoais e de conta' },
  { id: 2, label: 'Notificações', supporting: 'Personalizar alertas e e-mails de lançamentos' },
  { id: 3, label: 'Segurança', supporting: 'Gerenciar senhas, autenticação e acessos ativos' },
  { id: 4, label: 'Idioma e Região', supporting: 'Escolher o idioma da interface e preferências de catálogo' },
  { id: 5, label: 'Planos e Pagamentos', supporting: 'Gerenciar métodos de pagamento e assinaturas premium' },
  { id: 6, label: 'Privacidade', supporting: 'Controlar o uso de seus dados e cookies' },
  { id: 7, label: 'Dispositivos Conectados', supporting: 'Visualizar e desconectar aparelhos ativos' },
  { id: 8, label: 'Acessibilidade', supporting: 'Ajustes para legendas e melhor navegação visual' },
  { id: 9, label: 'Sobre o CineKeep', supporting: 'Informações sobre a plataforma, termos e versão do sistema' },
];

function Configuracoes() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Alinhamento de título seguindo o print de ontem */}
      <h1 style={{ color: 'var(--texto-claro)', fontSize: '28px', marginBottom: '32px', fontWeight: '600' }}>
        Configurações
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {opcoesConfiguracao.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-card)',
              padding: '16px 24px',
              borderRadius: '8px',
              border: '1px solid var(--borda)',
              cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            // Efeito hover simples em linha puro
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--cor-destaque)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--borda)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {/* Ícone Genérico do Wireframe em formato circular */}
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Representação dos 3 pontos do mockup de forma minimalista */}
              <span style={{ color: 'var(--cor-destaque)', fontSize: '18px', fontWeight: 'bold' }}>⋮</span>
            </div>

            {/* Bloco de Textos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: 'var(--texto-claro)', fontSize: '16px', fontWeight: '600' }}>
                {item.label}
              </span>
              <span style={{ color: 'var(--texto-mutado)', fontSize: '14px' }}>
                {item.supporting}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Configuracoes;