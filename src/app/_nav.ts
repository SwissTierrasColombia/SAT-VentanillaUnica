interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Inicio',
    url: '/inicio',
    icon: 'icon-home'
  },
  {
    title: true,
    name: 'Consultas'
  },
  {
    name: 'Consulta General',
    url: '/consults/basic-parcel-info',
    icon: 'icon-magnifier'
  },
  {
    name: 'Consulta Institucional',
    url: '/consults/institutional-parcel-info',
    icon: 'icon-pencil'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Trámites'
  },
  {
    name: 'Solicitud Trámite',
    url: '/procedures/procedure-request',
    icon: 'icon-doc'
  },
  {
    name: 'Gestión de Trámites',
    url: '/procedures/procedure-management',
    icon: 'icon-control-play'
  },
  {
    name: 'Registro de Objeto de Régimen Especial',
    url: '/procedures/registro',
    icon: 'icon-list'
  },
  {
    name: 'Generador de procesos',
    url: '/procedures/bpm',
    icon: 'icon-list'
  }

];
