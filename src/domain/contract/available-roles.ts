import { availablePermissions } from "./available-permissions";

export const availableRoles = Object.freeze({
  admin: {
    name: "Administrador",
    description: "O usuário possui todas as permissões do sistema",
    permissions: Object.keys(availablePermissions).map((key) => key),
  },
  user: {
    name: "Usuário",
    description: "O usuário possui todas as permissões do sistema",
    permissions: [],
  },
  "free-trial": {
    name: "Free trial",
    description:
      "O usuário possui todas as permissões do sistema durante um determinado período",
    permissions: Object.keys(availablePermissions).map((key) => key),
  },
});
