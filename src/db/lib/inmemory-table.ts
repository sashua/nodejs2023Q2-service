import { v4 as uuid } from 'uuid';

interface Item {
  id: string;
}
type CreateItem<T extends Item> = Omit<T, 'id'>;
type UpdateItem<T extends Item> = Partial<Omit<T, 'id'>>;

export class InmemoryTable<T extends Item> {
  private items = new Map<Item['id'], T>();

  public create(data: CreateItem<T>): T {
    const item = { ...data, id: uuid() } as T;
    this.items.set(item.id, item);
    return item;
  }

  public find(id: Item['id']): T | null {
    return this.items.get(id) ?? null;
  }

  public findFirst(field: keyof T, value: unknown): T | null {
    for (const item of this.findAll()) {
      if (item[field] === value) return item;
    }
    return null;
  }

  public findMany(field: keyof T, value: unknown): T[] {
    const items: T[] = [];
    for (const item of this.findAll()) {
      if (item[field] === value) items.push(item);
    }
    return items;
  }

  public findAll() {
    return Array.from(this.items.values());
  }

  public update(id: Item['id'], data: UpdateItem<T>): T | null {
    const item = this.delete(id);
    if (!item) return null;
    const updatedItem = { ...item, ...data };
    this.items.set(id, updatedItem);
    return updatedItem;
  }

  public delete(id: Item['id']): T | null {
    const item = this.find(id);
    if (!item) return null;
    this.items.delete(id);
    return item;
  }
}
