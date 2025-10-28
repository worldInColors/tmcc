import { auth } from "@/auth";
import { getUserGuildRoles, hasRole } from "@/lib/discord";
import { redirect } from "next/navigation";
import CreateDesignForm from "./CreateDesignForm";

export default async function CreateDesignPage() {
  const session = await auth();

  if (!session) redirect("/designs");

  const userRoles = await getUserGuildRoles(
    session.user.accessToken!,
    process.env.DISCORD_GUILD_ID!
  );

  const isArchiver = hasRole(userRoles, process.env.DISCORD_ARCHIVER_ROLE_ID!);
  if (!isArchiver) redirect("/designs");
  return <CreateDesignForm isArchiver={isArchiver} />;
}
