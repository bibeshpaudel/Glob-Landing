/**
 * Glob Explorer — Landing Page Interactive Engine
 * Controls: Screenshot Gallery, Lightbox, ripgrep + fzf V2 Search Playground,
 * Shortcuts Filter, and Responsive Nav.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Screenshot Showcase & Lightbox
     ========================================================================== */
  const SHOTS = [
    {
      id: 'search',
      label: 'Search & Content',
      meta: '291 ms',
      src: 'assets/search.png',
      alt: 'Glob Explorer dual search results across files, paths, and ripgrep content',
      captionTitle: 'Dual-Engine Search & Context Cards.',
      captionDesc: 'In-process fzf fuzzy matching over paths and streaming ripgrep full-text search with multi-line context cards side by side.'
    },
    {
      id: 'home',
      label: 'This PC & Drives',
      meta: '21 ms',
      src: 'assets/home.png',
      alt: 'This PC view with NTFS drive capacity meters and Quick Access pins',
      captionTitle: 'Hardware Volume Meters & Drives.',
      captionDesc: 'Sub-millisecond drive volume statistics, NTFS capacity gauges, pinned locations, and instant breadcrumb navigation.'
    },
    {
      id: 'preview',
      label: 'Live Inspector',
      meta: '2 ms',
      src: 'assets/preview.png',
      alt: 'Details view with live preview pane and image inspection',
      captionTitle: 'Zero-Latency Virtualized Inspector.',
      captionDesc: 'Rendered Markdown, syntax-highlighted code with virtualized line numbers, and pan-and-zoom image inspection (5%–1600%).'
    },
    {
      id: 'setting',
      label: 'Settings',
      meta: 'Config',
      src: 'assets/setting.png',
      alt: 'Settings panel for ignore rules, terminal choices and themes',
      captionTitle: 'Developer Exclusions & Local JSON.',
      captionDesc: 'Instant toggles for .gitignore rules, hidden files, terminal executables (wt, pwsh, code), saved purely in local JSON.'
    }
  ];

  let currentShotIndex = 0;
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const showcaseImg = document.getElementById('showcase-main-img');
  const showcaseCaptionTitle = document.getElementById('showcase-caption-title');
  const showcaseCaptionDesc = document.getElementById('showcase-caption-desc');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const showcaseViewport = document.getElementById('showcase-viewport');

  function updateShot(index) {
    currentShotIndex = (index + SHOTS.length) % SHOTS.length;
    const shot = SHOTS[currentShotIndex];

    showcaseTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentShotIndex);
      tab.setAttribute('aria-selected', i === currentShotIndex ? 'true' : 'false');
    });

    if (showcaseImg) {
      showcaseImg.src = shot.src;
      showcaseImg.alt = shot.alt;
    }

    if (showcaseCaptionTitle) showcaseCaptionTitle.textContent = shot.captionTitle;
    if (showcaseCaptionDesc) showcaseCaptionDesc.textContent = shot.captionDesc;
    if (lightboxImg) {
      lightboxImg.src = shot.src;
      lightboxImg.alt = shot.alt;
    }
  }

  showcaseTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      updateShot(idx);
    });
  });

  if (showcaseViewport) {
    showcaseViewport.addEventListener('click', () => {
      if (lightboxModal) lightboxModal.classList.add('is-open');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', () => {
      lightboxModal.classList.remove('is-open');
    });
  }

  /* ==========================================================================
     2. Simulated Dataset for Search Playground (Ripgrep + fzf V2 Engine)
     ========================================================================== */
  const MOCK_INDEX = [
    {
      type: 'dir',
      path: 'src/Glob.Core/Search',
      size: '4 KB',
      ext: 'dir',
      content: 'dual engine continuous substring and fzf v2 fuzzy matching'
    },
    {
      type: 'file',
      path: 'src/Glob.Core/Search/RipgrepEngine.cs',
      size: '28 KB',
      ext: 'cs',
      content: 'public async IAsyncEnumerable<RipgrepMatch> StreamSearchAsync(string pattern, SearchOptions options)'
    },
    {
      type: 'file',
      path: 'src/Glob.Core/Search/FzfScorer.cs',
      size: '19 KB',
      ext: 'cs',
      content: 'public static int CalculateScore(ReadOnlySpan<char> text, ReadOnlySpan<char> pattern, bool isFilename)'
    },
    {
      type: 'file',
      path: 'src/Glob.UI/Views/DiffMergeEditor.xaml.cs',
      size: '42 KB',
      ext: 'cs',
      content: 'private readonly MyersDiffEngine _diffEngine = new MyersDiffEngine(DiffAlgorithm.MyersOND);'
    },
    {
      type: 'file',
      path: 'src/Glob.UI/Controls/DiffMinimapCanvas.cs',
      size: '14 KB',
      ext: 'cs',
      content: 'DirectComposition hardware clipping prevents text bleed between side-by-side columns.'
    },
    {
      type: 'file',
      path: 'src/Glob.Core/Archives/InPlaceArchiveBrowser.cs',
      size: '31 KB',
      ext: 'cs',
      content: 'Windows-bundled tar.exe libarchive for zero-extraction streaming preview inside .7z and .rar'
    },
    {
      type: 'file',
      path: 'src/Glob.UI/Views/StorageTreemapView.xaml.cs',
      size: '24 KB',
      ext: 'cs',
      content: 'Squarified treemap Ctrl+Shift+4 storage allocation breakdown categorized by file type'
    },
    {
      type: 'file',
      path: 'src/Glob.Core/Shell/ShellThumbnailExtractor.cs',
      size: '18 KB',
      ext: 'cs',
      content: 'IShellItemImageFactory WIC downsampled decoding with bounded 1,000-item LRU cache'
    },
    {
      type: 'file',
      path: 'src/Glob.Core/Shell/SafeFileOperations.cs',
      size: '16 KB',
      ext: 'cs',
      content: 'SHFileOperation FO_DELETE with FOF_ALLOWUNDO defaults safe deletions directly to Windows Recycle Bin'
    },
    {
      type: 'file',
      path: 'src/Glob.Core/Shell/TerminalLauncher.cs',
      size: '9 KB',
      ext: 'cs',
      content: 'Execute terminal wt, pwsh, cmd, code directly in the active working directory'
    },
    {
      type: 'file',
      path: 'tests/Glob.Tests/MyersDiffTests.cs',
      size: '15 KB',
      ext: 'cs',
      content: 'Assert.Equal(ChangeType.Modified, result.Tokens[0].Type); // TODO: test BOM preservation'
    },
    {
      type: 'file',
      path: 'src/Glob.UI/Inspectors/MarkdownViewer.xaml',
      size: '11 KB',
      ext: 'xaml',
      content: '<MarkdownTextBlock RenderHeadings="True" SyntaxHighlightCode="True" />'
    },
    {
      type: 'file',
      path: 'src/Glob.UI/Inspectors/ImagePanZoomViewer.xaml.cs',
      size: '15 KB',
      ext: 'cs',
      content: 'Inspect images from 5% to 1600% with checkerboard background and hardware acceleration'
    },
    {
      type: 'file',
      path: 'docs/keyboard_shortcuts.md',
      size: '7 KB',
      ext: 'md',
      content: '# Glob Explorer Shortcut Reference: Ctrl+K, Ctrl+1, Ctrl+2, Ctrl+Shift+4, Alt+P'
    },
    {
      type: 'file',
      path: 'Package.appxmanifest',
      size: '8 KB',
      ext: 'xml',
      content: '<!-- 100% Offline: internetClient capability is strictly omitted -->'
    },
    {
      type: 'file',
      path: 'settings.json',
      size: '2 KB',
      ext: 'json',
      content: '{ "respectGitignore": true, "terminal": "wt", "theme": "MicaAlt", "lruCacheLimit": 1000 }'
    }
  ];

  const searchInput = document.getElementById('playground-search-input');
  const searchResultsContainer = document.getElementById('search-results-container');
  const searchMatchCount = document.getElementById('search-match-count');
  const syntaxPills = document.querySelectorAll('.syntax-pill');

  function highlightMatches(text, queryTokens) {
    if (!queryTokens || queryTokens.length === 0) return escapeHtml(text);

    // Find all ranges in text that match any token
    const lower = text.toLowerCase();
    const intervals = [];

    queryTokens.forEach((tok) => {
      if (!tok || tok.length === 0) return;
      let startIdx = 0;
      while ((startIdx = lower.indexOf(tok, startIdx)) !== -1) {
        intervals.push([startIdx, startIdx + tok.length]);
        startIdx += 1;
      }
    });

    if (intervals.length === 0) {
      // Try fuzzy single-char matching
      return escapeHtml(text);
    }

    // Merge overlapping intervals
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
      const last = merged[merged.length - 1];
      const cur = intervals[i];
      if (cur[0] <= last[1]) {
        last[1] = Math.max(last[1], cur[1]);
      } else {
        merged.push(cur);
      }
    }

    let out = '';
    let curr = 0;
    merged.forEach(([start, end]) => {
      out += escapeHtml(text.slice(curr, start));
      out += `<span class="hl-match">${escapeHtml(text.slice(start, end))}</span>`;
      curr = end;
    });
    out += escapeHtml(text.slice(curr));
    return out;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function performSearch(rawQuery) {
    const q = (rawQuery || '').trim();
    if (!searchResultsContainer) return;

    let tokens = q.split(/\s+/).filter(Boolean);
    let isContentQuery = false;
    let contentPattern = '';
    let extFilter = '';
    let typeFilter = '';
    let pathFilter = '';
    let negativeTerms = [];
    let positiveTokens = [];

    tokens.forEach((term) => {
      if (term.startsWith('content:')) {
        isContentQuery = true;
        contentPattern = term.slice(8).toLowerCase();
      } else if (term.startsWith('ext:')) {
        extFilter = term.slice(4).toLowerCase();
      } else if (term.startsWith('t:')) {
        typeFilter = term.slice(2).toLowerCase();
      } else if (term.startsWith('in:')) {
        pathFilter = term.slice(3).toLowerCase();
      } else if (term.startsWith('!')) {
        negativeTerms.push(term.slice(1).toLowerCase());
      } else if (term.startsWith("'")) {
        positiveTokens.push(term.slice(1).toLowerCase());
      } else if (term.startsWith('^')) {
        positiveTokens.push(term.slice(1).toLowerCase());
      } else if (term.endsWith('$')) {
        positiveTokens.push(term.slice(0, -1).toLowerCase());
      } else {
        positiveTokens.push(term.toLowerCase());
      }
    });

    const matches = [];

    MOCK_INDEX.forEach((item) => {
      const pathLower = item.path.toLowerCase();
      const contentLower = item.content.toLowerCase();

      // Negative check
      for (const neg of negativeTerms) {
        if (neg && (pathLower.includes(neg) || contentLower.includes(neg))) {
          return;
        }
      }

      // Extension filter
      if (extFilter && item.ext !== extFilter) return;

      // Type filter
      if (typeFilter) {
        if (typeFilter === 'code' && !['cs', 'ts', 'js', 'xaml'].includes(item.ext)) return;
        if (typeFilter === 'doc' && !['md', 'txt', 'pdf'].includes(item.ext)) return;
        if (typeFilter === 'archive' && !['zip', 'rar', '7z', 'tar'].includes(item.ext)) return;
      }

      // Path filter
      if (pathFilter && !pathLower.includes(pathFilter)) return;

      // Check positive tokens against path or content
      let pathMatched = true;
      let contentMatched = false;
      let contentMatchSnippet = '';

      if (isContentQuery) {
        if (contentLower.includes(contentPattern)) {
          contentMatched = true;
          contentMatchSnippet = item.content;
        } else {
          return;
        }
      } else if (positiveTokens.length > 0) {
        // If content contains search term, flag for context card
        for (const tok of positiveTokens) {
          if (!pathLower.includes(tok)) {
            pathMatched = false;
          }
          if (contentLower.includes(tok)) {
            contentMatched = true;
            contentMatchSnippet = item.content;
          }
        }
        if (!pathMatched && !contentMatched) return;
      }

      matches.push({
        item,
        pathMatched,
        contentMatched,
        snippet: contentMatchSnippet
      });
    });

    // Render Results
    if (matches.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="search-no-results">
          No files or content matches found for "${escapeHtml(q)}".<br>
          <span style="font-size: 12px; color: #7d7d86; margin-top: 8px; display: inline-block;">
            Try removing a filter chip, checking .gitignore, or pressing <kbd>Ctrl+I</kbd>.
          </span>
        </div>
      `;
      if (searchMatchCount) searchMatchCount.textContent = '0 items found';
      return;
    }

    if (searchMatchCount) {
      searchMatchCount.textContent = `${matches.length} of ${MOCK_INDEX.length} items (streaming ${Math.min(matches.length * 12, 120)} ms)`;
    }

    let html = '';
    matches.forEach(({ item, contentMatched, snippet }) => {
      const badgeClass = item.type === 'dir' ? 'badge-dir' : (contentMatched ? 'badge-content' : 'badge-file');
      const badgeText = item.type === 'dir' ? 'DIR' : (contentMatched ? 'MATCH' : item.ext.toUpperCase());

      const highlightedPath = highlightMatches(item.path, positiveTokens);

      let contextCardHtml = '';
      if (contentMatched && snippet) {
        const highlightedSnippet = highlightMatches(snippet, isContentQuery ? [contentPattern] : positiveTokens);
        const lineNum = Math.floor(Math.random() * 80) + 12;
        contextCardHtml = `
          <div class="context-card">
            <span class="context-line-number">Line ${lineNum}</span>
            <span>…${highlightedSnippet}…</span>
          </div>
        `;
      }

      html += `
        <div class="search-result-item">
          <span class="result-badge ${badgeClass}">${badgeText}</span>
          <div class="result-content-col">
            <div class="result-path">${highlightedPath}</div>
            ${contextCardHtml}
          </div>
        </div>
      `;
    });

    searchResultsContainer.innerHTML = html;
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    // Initial search preview
    performSearch(searchInput.value);
  }

  // Quick syntax click handling
  syntaxPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query');
      if (searchInput && q) {
        searchInput.value = q;
        searchInput.focus();
        performSearch(q);
      }
    });
  });

  /* ==========================================================================
     3. Keyboard Shortcuts Search Filter
     ========================================================================== */
  const shortcutsSearchInput = document.getElementById('shortcuts-search-input');
  const shortcutRows = document.querySelectorAll('.shortcut-row');
  const noShortcutsMsg = document.getElementById('no-shortcuts-found');

  if (shortcutsSearchInput) {
    shortcutsSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      shortcutRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        const matches = !term || text.includes(term);
        row.style.display = matches ? 'flex' : 'none';
        if (matches) visibleCount++;
      });

      if (noShortcutsMsg) {
        noShortcutsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  /* ==========================================================================
     4. Global Keyboard Shortcuts: Ctrl+K, Arrows, Escape
     ========================================================================== */
  window.addEventListener('keydown', (e) => {
    // Escape closes lightbox
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('is-open')) {
        lightboxModal.classList.remove('is-open');
      }
    }

    // Ctrl+K / Cmd+K focuses search box
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        // Scroll smoothly to search section if not visible
        const searchSec = document.getElementById('search');
        if (searchSec) {
          searchSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    // Arrow Left / Arrow Right switch screenshot tabs when not inside an input
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if (e.key === 'ArrowRight') {
      updateShot(currentShotIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      updateShot(currentShotIndex - 1);
    }
  });

  /* ==========================================================================
     5. Mobile Menu Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('site-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
    });

    // Close when clicking a nav link
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
      });
    });
  }

  /* ==========================================================================
     6. Smooth Scroll to Top for Brand Link
     ========================================================================== */
  const brandLinks = document.querySelectorAll('a[href="#top"], .brand-link');
  brandLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

})();
