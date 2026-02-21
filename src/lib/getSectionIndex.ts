import { SectionByLayer, RouteMeta } from '@/store/useNavMeta'

const INTRO_ORDER: SectionByLayer['intro'][] = ['', 'contact', 'sponsors']
const TRACK_ORDER: SectionByLayer['tracks'][] = ['', 'ps', 'prizes', 'faq', 'rules']

export function getSectionIndex(meta: RouteMeta): number {
  if (meta.section === undefined) return -1

  if (meta.layer === 'intro') {
    return INTRO_ORDER.indexOf(meta.section as SectionByLayer['intro'])
  } else {
    return TRACK_ORDER.indexOf(meta.section as SectionByLayer['tracks'])
  }
}
