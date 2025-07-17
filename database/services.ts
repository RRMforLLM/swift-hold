import db from './db';

export const getUniforms = async () => {
  const query = 'SELECT * FROM UNIFORMS';
  try {
    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error('❌ Error fetching uniforms:', error);
    throw error;
  }
};

export const insertUniform = async ({
  type,
  size,
}: {
  type: string;
  size: string;
}): Promise<number> => {
  const query = 'INSERT INTO UNIFORMS (type, size) VALUES (?, ?)';
  try {
    const result = await db.runAsync(query, [type, size]);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error inserting uniform:', error);
    throw error;
  }
};

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