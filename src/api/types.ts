export type API = {
  get<T>({ entity }: { entity: string }): Promise<T>;
  post<T>({
    entity,
    data,
    options,
  }: {
    entity: string;
    data: Record<string, unknown>;
    options?: Record<string, unknown>;
  }): Promise<T>;

  patch<T>({
    entity,
    data,
  }: {
    entity: string;
    data: Record<string, unknown>;
  }): Promise<T>;

  create<T>({
    entity,
    jsonData,
  }: {
    entity: string;
    jsonData: Record<string, unknown>;
  }): Promise<T>;

  createAndUpload<T>({
    entity,
    jsonData,
  }: {
    entity: string;
    jsonData: Record<string, unknown>;
  }): Promise<T>;

  exists<T>({ entity, id }: { entity: string; id: string }): Promise<T>;
  read<T>({ entity, id }: { entity: string; id: string }): Promise<T>;

  update<T>({
    entity,
    id,
    jsonData,
  }: {
    entity: string;
    id: string;
    jsonData: Record<string, unknown>;
  }): Promise<T>;

  updateAndUpload<T>({
    entity,
    id,
    jsonData,
  }: {
    entity: string;
    id: string;
    jsonData: Record<string, unknown>;
  }): Promise<T>;

  delete<T>({
    entity,
    id,
    options,
  }: {
    entity: string;
    id: string;
    options?: Record<string, unknown>;
  }): Promise<T>;

  filter<T>({
    entity,
    options,
  }: {
    entity: string;
    options?: Record<string, unknown>;
  }): Promise<T>;

  search<T>({
    entity,
    options,
  }: {
    entity: string;
    options?: Record<string, unknown>;
  }): Promise<T>;

  list<T>({
    entity,
    options,
  }: {
    entity: string;
    options?: Record<string, unknown>;
  }): Promise<T>;

  listAll<T>({ entity }: { entity: string }): Promise<T>;
};
