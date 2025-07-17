import db from './db';

export const insertOperation = async ({
  operation,
  uniform,
  store,
  quantity,
  date,
}: {
  operation: boolean;
  uniform: number;
  store: string;
  quantity: number;
  date: string;
}): Promise<boolean> => {
  const query = `
    INSERT INTO OPERATIONS (operation, uniform, store, quantity, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    await db.runAsync(query, [
      operation ? 1 : 0,
      uniform,
      store,
      quantity,
      date,
    ]);
    console.log('✅ Operation inserted');
    return true;
  } catch (error) {
    console.error('❌ Error inserting operation:', error);
    throw error;
  }
};