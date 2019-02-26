addLoadHandler(function() {
  [].forEach.call(document.querySelectorAll('[link]'), function (e, i) {
        e.addEventListener('click', function (evt) {
            if (e.getAttribute('_blank') !== null) {
                window.open(e.getAttribute('link'), '_blank');
            } else {
                location.href = e.getAttribute('link');
            }
            return false;
        });
    });

  [].forEach.call(querySelectorAll('.toggle-check .toggle-label'), function(e, i) {
      var dom = document.getElementById(e.getAttribute('for'));
      if(dom === null || dom === undefined) {
        return false;
      }

      var state = dom.getAttribute('checked');
      var disabled = dom.getAttribute('disabled');

      if(disabled !== null && disabled !== undefined) {
        e.classList.add('disabled');
        return false;
      }

      if(state !== undefined && state !== null) {
        [].forEach.call(document.querySelectorAll('[name=\"' + dom.getAttribute('name') + '\"]'), function(_e, _i) {
          _e.removeAttribute('checked');
          document.querySelector('[for=\"' + _e.id + '\"]').classList.remove('choice');
        });
        e.classList.add('choice');
      }

      e.addEventListener('click', function(evt) {
        evt.preventDefault();

        var dom = document.getElementById(e.getAttribute('for'));
        var checked_state = dom.getAttribute('checked');
        triggerEvent(dom, 'change');
      });

      dom.addEventListener('change', function() {
          [].forEach.call(document.querySelectorAll('[name=\"' + dom.getAttribute('name') + '\"]'), function(_e, _i) {
          _e.removeAttribute('checked');
          document.querySelector('[for=\"' + _e.id + '\"]').classList.remove('choice');
        });

        e.classList.add('choice');
        this.setAttribute('checked', '');
      });
  });
});