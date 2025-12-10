import { formatDateRequest } from '../../helpers/peticion';

const cardStyle = {
  position: 'absolute',
  top: '30px',
  left: '0',
  background: '#ffffff',
  padding: '16px 20px',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
  minWidth: '280px',
  width: '100%',
  maxHeight: '300px',
  overflowY: 'auto',
  fontSize: '0.85rem',
  color: '#333',
  lineHeight: '1.4',
  border: '1px solid #e0e0e0',
  zIndex: 9999,
};

export const DetailRequestQosqo = ({
  title,
  data,
  progress,
  color = 'Blue',
}) => {
  return (
    <div style={cardStyle}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#00458e' }}>
        {title}: {data?.subject || 'Sin especificar'}
      </h4>

      <div style={{ marginBottom: '8px', fontSize: '0.8rem', color: '#555' }}>
        <p style={{ margin: '2px 0' }}>
          <b>Código:</b> {data?.id || 'Sin especificar'}
        </p>
        <p style={{ margin: '2px 0' }}>
          <b>Descripción:</b> {data?.description || 'Sin especificar'}
        </p>
        <p style={{ margin: '2px 0' }}>
          <b>Fecha Inicio:</b> {formatDateRequest(data?.start_date)}
        </p>
        <p style={{ margin: '2px 0' }}>
          <b>Fecha Fin:</b> {formatDateRequest(data?.due_date)}
        </p>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <p style={{ margin: '2px 0', fontWeight: 'bold', fontSize: '0.8rem' }}>
          Avance: {progress}%
        </p>

        <div
          style={{
            width: '100%',
            height: '8px',
            background: '#e5e5e5',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: color,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: '#555' }}>
        <p style={{ margin: '2px 0' }}>
          <b>Prioridad:</b> {data?.priority?.name || 'Normal'}
        </p>
        {(data?.tracker?.name === 'Objetivo' ||
          data?.tracker?.name === 'Tarea') && (
          <p style={{ margin: '2px 0' }}>
            <b>Indicadores:</b> {data?.children?.length || 0}
          </p>
        )}
        <p style={{ margin: '2px 0' }}>
          <b>Creado:</b> {formatDateRequest(data?.created_on)}
        </p>
        <p style={{ margin: '2px 0' }}>
          <b>Última actualización:</b> {formatDateRequest(data?.updated_on)}
        </p>
      </div>
    </div>
  );
};
