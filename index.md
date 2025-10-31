---
layout: home
title: "Jekyll:iä käyttävä sivusto"
subtitle: "ebfs"
---

## [GitHub repo location](https://github.com/ebfs/ppwk-2025)

| GitHub commit tag   | Selite                      |
|--------|------------------------------------------|
| `vko2` | Viikko 2 liittyvien tehtävien commit.    |
| `vko3` | Viikko 3 liittyvien tehtävien commit.    |
| `vko4` | Viikko 4 liittyvien tehtävien commit.    |
| `vko5` | Viikko 5 liittyvien tehtävien commit.    |
| `vko6` | Viikko 6 liittyvien tehtävien commit.    |
| `HT`   | Harjoitustyö commit.                     |
| `MAINT`| Maintenance commit.                      |
| `AUTO` | Automation commit.                       |

## commits kaavio

<canvas id="deployChart" width="400" height="200"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
fetch('/data/daily-deployments.json')
  .then(r => r.json())
  .then(data => {
    const labels = data.map(d => d.date);
    const counts = data.map(d => d.count);

    const ctx = document.getElementById('deployChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Commits per day',
          data: counts,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  });
</script>