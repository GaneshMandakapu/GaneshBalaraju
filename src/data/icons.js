/**
 * Local icon registry. Every icon ships in the bundle via react-icons, so the
 * skills section makes zero network requests — the original implementation
 * pulled ~25 logos from 20 different third-party CDNs and then rendered them as
 * white silhouettes anyway.
 *
 * `color` is the brand colour where one exists; process/capability entries
 * (which have no logo) use a generic Tabler glyph tinted to their category.
 */
import {
  SiHubspot,
  SiPostgresql,
  SiPython,
  SiPandas,
  SiNumpy,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGithubactions,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiJira,
} from 'react-icons/si';
import {
  TbApi,
  TbDatabase,
  TbChartBar,
  TbRefresh,
  TbWebhook,
  TbUsers,
  TbSettingsAutomation,
  TbReportAnalytics,
  TbFilter,
  TbAddressBook,
  TbArrowsShuffle,
  TbTransform,
} from 'react-icons/tb';

export const iconMap = {
  // Revenue Operations & CRM
  hubspot: { Icon: SiHubspot, color: '#FF7A59' },
  crm: { Icon: TbAddressBook, color: '#FF7A59' },
  funnel: { Icon: TbFilter, color: '#FF7A59' },
  automation: { Icon: TbSettingsAutomation, color: '#FF9F6B' },
  report: { Icon: TbReportAnalytics, color: '#FF9F6B' },
  chart: { Icon: TbChartBar, color: '#FF9F6B' },

  // Data & Analytics
  sql: { Icon: TbDatabase, color: '#3CC2BD' },
  database: { Icon: TbDatabase, color: '#3CC2BD' },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  python: { Icon: SiPython, color: '#3776AB' },
  pandas: { Icon: SiPandas, color: '#E70488' },
  numpy: { Icon: SiNumpy, color: '#4DABCF' },
  etl: { Icon: TbTransform, color: '#3CC2BD' },

  // Systems & Integration
  webhook: { Icon: TbWebhook, color: '#8B7CF6' },
  make: { Icon: TbArrowsShuffle, color: '#6D00CC' },
  api: { Icon: TbApi, color: '#5856D6' },
  fastapi: { Icon: SiFastapi, color: '#009688' },

  // Frontend
  react: { Icon: SiReact, color: '#61DAFB' },
  nextjs: { Icon: SiNextdotjs, color: '#FFFFFF' },
  typescript: { Icon: SiTypescript, color: '#3178C6' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  html5: { Icon: SiHtml5, color: '#E34F26' },
  css3: { Icon: SiCss3, color: '#1572B6' },

  // Platform & DevOps
  githubactions: { Icon: SiGithubactions, color: '#2088FF' },
  docker: { Icon: SiDocker, color: '#2496ED' },
  kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  git: { Icon: SiGit, color: '#F05032' },

  // Ways of working
  agile: { Icon: TbRefresh, color: '#FFD60A' },
  jira: { Icon: SiJira, color: '#0052CC' },
  users: { Icon: TbUsers, color: '#FFD60A' },
};

export const getIcon = (key) => iconMap[key] || { Icon: TbApi, color: '#888' };
