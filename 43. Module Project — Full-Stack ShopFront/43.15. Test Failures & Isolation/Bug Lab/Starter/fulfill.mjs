export async function fulfill(client, orderId, workspaceId) {
  await client.query('INSERT INTO replay_fulfillment (order_id,workspace_id) VALUES ($1,$2)', [orderId,workspaceId]);
}
