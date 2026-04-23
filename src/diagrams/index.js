import { nodes as scadaNodes, edges as scadaEdges } from './ScadaArchitecture/data'
import { nodes as espNodes,   edges as espEdges   } from './EspWeatherStation/data'

/**
 * Registro central de diagramas.
 * Para agregar un nuevo diagrama:
 *   1. Crea src/diagrams/MiDiagrama/data.js  (exporta `nodes` y `edges`)
 *   2. Añade una entrada aquí.
 */
export const diagrams = [
  {
    id         : 'scada-industrial',
    title      : 'Arquitectura SCADA Industrial',
    description: 'Pipeline completo: dispositivos de campo → MQTT Broker → Backend Python → TimescaleDB → React HMI.',
    category   : 'Industrial IoT',
    accentColor: '#3b82f6',
    tags       : ['Modbus', 'OPC UA', 'MQTT', 'FastAPI', 'TimescaleDB', 'React'],
    nodes      : scadaNodes,
    edges      : scadaEdges,
    updatedAt  : '2026-04-23',
  },
  {
    id         : 'esp-weather-station',
    title      : 'ESP8266 Weather Station',
    description: 'Estación meteorológica IoT con sensores DHT22/BME280, publicación MQTT, Node-RED y visualización en Grafana.',
    category   : 'IoT / Embedded',
    accentColor: '#10b981',
    tags       : ['ESP8266', 'MQTT', 'Node-RED', 'InfluxDB', 'Grafana'],
    nodes      : espNodes,
    edges      : espEdges,
    updatedAt  : '2026-04-23',
  },
]
