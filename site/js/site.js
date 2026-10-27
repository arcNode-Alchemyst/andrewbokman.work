// Small enhancements. The page reads and works without this file,
// except for the mobile menu, which falls back to showing the links,
// and the "Open all roles" button, which is hidden without it.
// Without it the progression line is shown fully drawn instead of flowing in.

(function () {
  'use strict';

  // Tells the inline script in <head> that this file ran (see the progression flow below).
  window.siteScriptReady = true;

  // Mobile menu: a native <dialog>, so focus trapping and Escape come for free.
  var menu = document.getElementById('menu');
  var openButton = document.querySelector('.header__menu-button');

  if (menu && openButton && typeof menu.showModal === 'function') {
    var followedLink = false;

    openButton.addEventListener('click', function () {
      followedLink = false;
      menu.showModal();
    });

    menu.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('a')) {
        followedLink = true;
        menu.close();
      } else if (target.closest('[data-menu-close]')) {
        menu.close();
      }
    });

    // Closing without choosing a link returns focus to the Menu button.
    // After a link, the page has moved to that section, so leave the scroll alone.
    menu.addEventListener('close', function () {
      if (!followedLink) openButton.focus({ preventScroll: true });
    });
  }

  // Header navigation: mark the link for the section currently in view.
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.header__links .nav-link'));
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Set();

    var setCurrent = function () {
      var current = sections.filter(function (section) {
        return visible.has(section.id);
      })[0];

      navLinks.forEach(function (link) {
        if (current && link.getAttribute('href') === '#' + current.id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setCurrent();
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // Experience: one button opens or closes every role. The label follows the rows,
  // so it stays right when a row is opened by hand.
  var rowsToggle = document.querySelector('[data-rows-toggle]');
  var rowsList = rowsToggle && document.getElementById(rowsToggle.getAttribute('aria-controls'));
  var rows = rowsList ? Array.prototype.slice.call(rowsList.querySelectorAll('details')) : [];

  if (rowsToggle && rows.length) {
    var allOpen = function () {
      return rows.every(function (row) { return row.open; });
    };

    var syncToggle = function () {
      var open = allOpen();
      rowsToggle.textContent = open ? 'Close all roles' : 'Open all roles';
      rowsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    rowsToggle.addEventListener('click', function () {
      var open = !allOpen();
      rows.forEach(function (row) { row.open = open; });
      syncToggle();
    });

    rows.forEach(function (row) {
      row.addEventListener('toggle', syncToggle);
    });

    syncToggle();
  }

  // Printing shows every role in full.
  window.addEventListener('beforeprint', function () {
    Array.prototype.forEach.call(document.querySelectorAll('details'), function (row) {
      row.open = true;
    });
  });

  // Progression: the flow line fills once, the first time the stages are seen.
  // The inline script in <head> empties the line (class "js-flow") only when the device
  // allows motion. The flow waits for the opening sequence to finish, so on a wide screen
  // (where the stages are visible straight away) the two read as one movement.
  var root = document.documentElement;
  var stages = document.querySelector('.stages');

  if (!stages) root.classList.remove('js-flow');

  if (stages && root.classList.contains('js-flow')) {
    var openingEnds = Date.now() + 1100;

    var flowObserver = new IntersectionObserver(
      function (entries, observer) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        observer.disconnect();
        window.setTimeout(function () {
          stages.classList.add('is-flowing');
        }, Math.max(0, openingEnds - Date.now()));
      },
      { threshold: 0.25 }
    );

    flowObserver.observe(stages);
  }
})();
