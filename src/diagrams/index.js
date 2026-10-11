import { nodes as scadaNodes, edges as scadaEdges } from './ScadaArchitecture/data'
import { nodes as espNodes,   edges as espEdges   } from './EspWeatherStation/data'
import { nodes as mqttNodes,  edges as mqttEdges  } from './MqttConfig/data'
import { nodes as dbNodes,    edges as dbEdges    } from './DatabaseSchema/data'
import { nodes as umlNodes,   edges as umlEdges   } from './PythonClasses/data'

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
  {
    id         : 'mqtt-security-config',
    title      : 'Configuración de Seguridad MQTT',
    description: 'Niveles de seguridad en Mosquitto: mTLS (8884), TLS con Let\'s Encrypt (8883) y conexiones en texto plano (1883).',
    category   : 'Seguridad / Redes',
    accentColor: '#f97316',
    tags       : ['Mosquitto', 'mTLS', 'TLS', 'Certificados', 'Seguridad'],
    nodes      : mqttNodes,
    edges      : mqttEdges,
    updatedAt  : '2026-04-23',
  },
  {
    id         : 'scada-database-schema',
    title: 'Esquema de Base de Datos SCADA',
    description: 'Diagrama Entidad-Relación mostrando tablas relacionales (PostgreSQL) e hypertablas de alta ingesta (TimescaleDB).',
    category   : 'Bases de Datos',
    accentColor: '#8b5cf6',
    tags       : ['PostgreSQL', 'TimescaleDB', 'ER Diagram', 'Relacional', 'Alarmas'],
    nodes      : dbNodes,
    edges      : dbEdges,
    updatedAt  : '2026-04-23',
  },
  {
    id         : 'python-factory-uml',
    title: 'UML: Protocol Factory Pattern',
    description: 'Diagrama de clases mostrando herencia y el patrón Factory para los drivers industriales (Modbus, OPC UA) en Python.',
    category   : 'Arquitectura de Software',
    accentColor: '#3b82f6',
    tags       : ['UML', 'Python', 'Factory', 'POO', 'Drivers'],
    nodes      : umlNodes,
    edges      : umlEdges,
    updatedAt  : '2026-04-23',
  },
]
