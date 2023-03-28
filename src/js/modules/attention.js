import { ScrollLock } from '../../components/scroll-lock/js/scroll-lock';

const attentionBlock = document.querySelector('.attention');

if (attentionBlock) {
    window.scrollLock.disableScrolling();
    attentionBlock.classList.add('attention--active');

    const closeAttentionBtn = attentionBlock.querySelector('.attention__close');

    function onDocumentClick() {
      document.removeEventListener('click', onDocumentClick);
    }

    closeAttentionBtn.addEventListener('click', ()=>{
      attentionBlock.remove();
      window.scrollLock.enableScrolling();
    })

    document.body.addEventListener('click', (e)=> {
      if (e.target === attentionBlock.querySelector('.attention__overlay')) {
        attentionBlock.remove();
        window.scrollLock.enableScrolling();
        onDocumentClick();
      }
    })

    document.body.addEventListener('click', (e)=> {
      if (e.target === attentionBlock.querySelector('.attention__overlay')) {
        attentionBlock.remove();
        window.scrollLock.enableScrolling();
        onDocumentClick();
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        attentionBlock.remove();
        window.scrollLock.enableScrolling();
      }
    })
}
