import { state } from '../state/store.js';
import { getDomReferences } from '../utils/dom.js';

export function updateOrderSummaryText() {
  const { orderSummaryTextEl } = getDomReferences();
  if (!orderSummaryTextEl) return;
  const itemCount = state.cartItems.length;
  orderSummaryTextEl.textContent = `Seu Pedido (${itemCount} item${itemCount !== 1 ? 's' : ''})`;
}

export function toggleOrderPanelVisibility(forceState) {
  const DOM = getDomReferences();
  const { orderPanel } = DOM;
  if (!orderPanel) return;
  const shouldBeVisible = typeof forceState === 'boolean' ? forceState : state.cartItems.length > 0;
  orderPanel.classList.toggle('visible', shouldBeVisible);
  orderPanel.setAttribute('aria-hidden', String(!shouldBeVisible));
  document.body.classList.toggle('order-panel-padding', shouldBeVisible);
  if (!shouldBeVisible && orderPanel.classList.contains('expanded')) {
    toggleOrderDetailsView(false);
  }
}

export function toggleOrderDetailsView(forceState) {
  const DOM = getDomReferences();
  const { orderPanel, toggleOrderDetailsBtn } = DOM;
  if (!orderPanel || !toggleOrderDetailsBtn) return;
  const isExpanded =
    typeof forceState === 'boolean' ? forceState : !orderPanel.classList.contains('expanded');
  orderPanel.classList.toggle('expanded', isExpanded);
  orderPanel.setAttribute('aria-expanded', String(isExpanded));
  toggleOrderDetailsBtn.setAttribute('aria-expanded', String(isExpanded));
}

export function renderOrderItemsList(handlers) {
  const { orderItemsListEl } = getDomReferences();
  if (!orderItemsListEl) return;

  orderItemsListEl.innerHTML = '';
  if (state.cartItems.length > 0) {
    state.cartItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.shortName} (${item.price})`;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-order-item-btn';
      removeBtn.title = `Remover ${item.shortName} do pedido`;
      removeBtn.setAttribute('aria-label', `Remover ${item.shortName}`);
      removeBtn.innerHTML = '<img src="icons/remove_shopping_cart.svg" alt="" class="icon-svg">';
      removeBtn.addEventListener('click', () => handlers.onRemoveItem(item));

      listItem.appendChild(removeBtn);
      orderItemsListEl.appendChild(listItem);
    });
  }

  updateOrderSummaryText();
  toggleOrderPanelVisibility();
}

export function setupOrderPanelListeners(handlers) {
  const DOM = getDomReferences();
  const { orderPanelHeader, toggleOrderDetailsBtn, sendOrderBtn } = DOM;

  if (orderPanelHeader) {
    orderPanelHeader.addEventListener('click', (event) => {
      if (
        toggleOrderDetailsBtn &&
        (event.target === toggleOrderDetailsBtn || toggleOrderDetailsBtn.contains(event.target))
      ) {
        return;
      }
      toggleOrderDetailsView();
    });

    orderPanelHeader.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (
          toggleOrderDetailsBtn &&
          (event.target === toggleOrderDetailsBtn || toggleOrderDetailsBtn.contains(event.target))
        ) {
          return;
        }
        toggleOrderDetailsView();
        event.preventDefault();
      }
    });
  }

  if (toggleOrderDetailsBtn) {
    toggleOrderDetailsBtn.addEventListener('click', () => toggleOrderDetailsView());
  }

  if (sendOrderBtn) {
    sendOrderBtn.addEventListener('click', handlers.onSendOrder);
  }
}
