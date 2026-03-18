import type { ReadUserDto } from "../../types/user";

export type UserListProps = {
  data: ReadUserDto[];
  onDelete: (uuid: string) => Promise<void>;
  onEdit: (uuid: string) => void;
  onCreateNew: () => void;
};

