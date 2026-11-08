import { useAppDispatch, useAppSelector } from "./app/hooks";
import { orderToggled, readyFilterChanged } from "./features/selection/selectionSlice";
import { orders } from "./orders";
import { QueueTable } from "./QueueTable";
export function OrderQueue() {
  const selectedIds = useAppSelector((state) => state.selection.selectedIds);
  const readyOnly = useAppSelector((state) => state.selection.readyOnly);
  const dispatch = useAppDispatch();
  const visibleOrders = readyOnly ? orders.filter((order) => order.status === "ready") : orders;
  return (
    <div>
      <div className="filter-bar">
        <label>
          <input type="checkbox" checked={readyOnly} onChange={(event) => dispatch(readyFilterChanged(event.target.checked))} />
          Show ready orders only
        </label>
        <span className="muted">Selection stays across filters</span>
      </div>
      <QueueTable orders={visibleOrders} selectedIds={selectedIds} onToggle={(id) => dispatch(orderToggled(id))} />
    </div>
  );
}
