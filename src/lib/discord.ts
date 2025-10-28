const DISCORD_API_BASE = "https://discord.com/api/v10";

export interface GuildMember {
  roles: string[];
  nick?: string;
  joined_at: string;
}

/**
 * Fetch a user's roles in a specific Discord guild
 */
export async function getUserGuildRoles(
  accessToken: string,
  guildId: string
): Promise<string[]> {
  try {
    const response = await fetch(
      `${DISCORD_API_BASE}/users/@me/guilds/${guildId}/member`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    const member: GuildMember = await response.json();
    return member.roles;
  } catch (error) {
    console.error("Error fetching Discord roles:", error);
    return [];
  }
}

/**
 * Check if user has a specific role
 */
export function hasRole(userRoles: string[], requiredRoleId: string): boolean {
  return userRoles.includes(requiredRoleId);
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  userRoles: string[],
  requiredRoleIds: string[]
): boolean {
  return requiredRoleIds.some((roleId) => userRoles.includes(roleId));
}

/**
 * Check if user has all of the specified roles
 */
export function hasAllRoles(
  userRoles: string[],
  requiredRoleIds: string[]
): boolean {
  return requiredRoleIds.every((roleId) => userRoles.includes(roleId));
}
