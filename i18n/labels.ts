/**
 * Helpers para traducir valores dinámicos provenientes de la base de datos
 * (badges, amenities, cargos de agentes, etc.) con fallback seguro al valor original.
 */

type Translator = (key: string, vars?: Record<string, string | number>) => string;
type KeyChecker = (key: string) => boolean;

export function getBadgeLabel(
  badge: string | undefined | null,
  t: Translator,
  has: KeyChecker
): string | undefined {
  if (!badge) return undefined;
  const key = `badges.${badge}`;
  return has(key) ? t(key) : badge;
}

export function getAmenityLabel(
  amenity: string,
  t: Translator,
  has: KeyChecker
): string {
  const key = `amenities.${amenity}`;
  return has(key) ? t(key) : amenity;
}

export function getAgentTitle(
  title: string | undefined | null,
  t: Translator,
  has: KeyChecker
): string {
  if (!title) return t("agent.topRated");
  const key = `agentTitles.${title}`;
  return has(key) ? t(key) : title;
}

