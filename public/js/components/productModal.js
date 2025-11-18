import { ClarityService } from '../services/clarityService.js';
import { state, setCurrentProductInModal, setModalTriggerElement } from '../state/store.js';
import { getDomReferences } from '../utils/dom.js';
import { getProductById, getProductImageBaseName } from '../utils/format.js';
import { updateCartActionButtonState } from './productList.js';

function populateModal(product) {
  const DOM = getDomReferences();
  if (DOM.modalImageContainer) {
    const baseName = getProductImageBaseName(product.imageSrc);
    DOM.modalImageContainer.innerHTML = `
      <picture>
        <source srcset="images/${baseName}-700.webp 700w, images/${baseName}-400.webp 400w, images/${baseName}-200.webp 200w" sizes="(max-width: 700px) 100vw, 700px" type="image/webp">
        <img src="images/${baseName}-280.webp" alt="Imagem de ${product.shortName}" class="modal-product-image" width="280" height="280" loading="lazy">
      </picture>
    `;
  }

  if (DOM.modalProductTitle) {
    DOM.modalProductTitle.textContent = product.fullName;
  }

  if (DOM.modalProductPriceInfo) {
    DOM.modalProductPriceInfo.innerHTML = `<strong>${product.price}</strong> <span class="original-price">${
      product.detailedInfo.valorOriginal || ''
    }</span>`;
  }

  if (DOM.modalProductGeneralDescription) {
    DOM.modalProductGeneralDescription.textContent = product.detailedInfo.descricaoGeral || 'Não informado.';
  }

  if (DOM.modalProductSpecifications) {
    DOM.modalProductSpecifications.innerHTML =
      product.detailedInfo.especificacoesHTML || '<p>Não informado.</p>';
  }

  if (DOM.modalProductState) {
    DOM.modalProductState.textContent = product.detailedInfo.estadoProduto || 'Não informado.';
  }

  if (DOM.modalProductPickupLocation) {
    DOM.modalProductPickupLocation.textContent = product.detailedInfo.localRetirada || 'Não informado.';
  }

  const hasObservations = Boolean(product.detailedInfo.observacoes);
  if (DOM.modalProductObservationsSection) {
    DOM.modalProductObservationsSection.style.display = hasObservations ? 'block' : 'none';
  }

  if (DOM.modalProductObservations && hasObservations) {
    DOM.modalProductObservations.textContent = product.detailedInfo.observacoes;
  }

  if (DOM.modalOlxBtn) {
    DOM.modalOlxBtn.style.display = product.olxLink ? '' : 'none';
    if (product.olxLink) {
      DOM.modalOlxBtn.href = product.olxLink;
    }
  }

  if (DOM.modalAddToCartBtn) {
    DOM.modalAddToCartBtn.dataset.productId = product.id;
  }
}

export function showProductDetailsModal(productId, triggerElement) {
  const product = getProductById(productId);
  const DOM = getDomReferences();
  if (!product || !DOM.productDetailsModal || !product.detailedInfo) {
    console.warn('Não é possível abrir modal para produto:', productId, product);
    return;
  }

  setCurrentProductInModal(product);
  setModalTriggerElement(triggerElement);

  ClarityService.trackEventWithTags('ProductDetailsViewed', {
    product_id: product.id,
    product_name: product.shortName
  });

  populateModal(product);
  updateCartActionButtonState(product.id);

  DOM.productDetailsModal.classList.add('visible');
  DOM.productDetailsModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (DOM.modalCloseBtn) {
    DOM.modalCloseBtn.focus();
  }
}

export function closeProductDetailsModal() {
  const DOM = getDomReferences();
  if (!DOM.productDetailsModal) return;

  if (state.elementThatTriggeredModal) {
    state.elementThatTriggeredModal.focus();
    setModalTriggerElement(null);
  } else {
    const fallbackHeading = document.querySelector('main h2');
    if (fallbackHeading) {
      fallbackHeading.setAttribute('tabindex', '-1');
      fallbackHeading.focus({ preventScroll: true });
      fallbackHeading.removeAttribute('tabindex');
    } else if (document.body) {
      document.body.setAttribute('tabindex', '-1');
      document.body.focus({ preventScroll: true });
      document.body.removeAttribute('tabindex');
    }
  }

  DOM.productDetailsModal.classList.remove('visible');
  DOM.productDetailsModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  setCurrentProductInModal(null);
}

export function setupProductModalListeners(handlers) {
  const DOM = getDomReferences();
  const { productDetailsModal, modalCloseBtn, modalAddToCartBtn, modalOlxBtn } = DOM;

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductDetailsModal);
  }

  if (productDetailsModal) {
    productDetailsModal.addEventListener('click', (event) => {
      if (event.target === productDetailsModal) {
        closeProductDetailsModal();
      }
    });

    productDetailsModal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeProductDetailsModal();
      }
    });
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
      if (!state.currentProductInModal) return;
      handlers.onToggleCart(state.currentProductInModal, { closeModal: true });
    });
  }

  if (modalOlxBtn) {
    modalOlxBtn.addEventListener('click', () => {
      if (state.currentProductInModal?.olxLink) {
        ClarityService.trackEventWithTags('OlxLinkClicked', {
          product_id: state.currentProductInModal.id,
          product_name: state.currentProductInModal.shortName
        });
      }
    });
  }
}
