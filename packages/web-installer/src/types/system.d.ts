type Common = {
  id: string;
  parentId: string | null;
  name: string;

  createdAt: number;
  updatedAt: number;
};

type File = Common & {
  content: string;

  extension: string;
  type: string;
};

// can't call it folder or linux users will eat me alive
type Directory = Common & {
  children: Array<File | Directory>;
};

export type System = Array<File | Directory>;
