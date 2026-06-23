# One-off: replace em/en dashes in site.js *content strings* with natural
# punctuation. Code comments are left untouched (they don't render).
import io

P = 'src/data/site.js'
t = io.open(P, encoding='utf-8').read()

# Em-dash prose — exact, context-aware replacements (ASCII-only match windows so
# typographic apostrophes never trip the match).
EM = [
    ('Universités — Praticien', 'Universités-Praticien'),
    ('mini-invasives — une double expertise qui lui permet',
     'mini-invasives. Cette double expertise lui permet'),
    ('Endovasculaire — Lauréat et Médaillé, Faculté',
     'Endovasculaire, Lauréat et Médaillé de la Faculté'),
    ('provisoire — à compléter', 'provisoire, à compléter'),
    ('examen — capturer', 'examen : capturer'),
    ('bon moment — ni dans', 'bon moment, ni dans'),
    ('simple — encore faut-il', 'simple, encore faut-il'),
    ('électrocardiogramme — rapide et indolore — et enfin',
     'électrocardiogramme (rapide et indolore) et enfin'),
    ('interventionnelle — traitement des troubles',
     'interventionnelle, traitement des troubles'),
    ('cathéter — un fin tuyau souple — introduit',
     'cathéter (un fin tuyau souple) introduit'),
    ('cœur — à condition de respecter', 'cœur, à condition de respecter'),
    ('au monde — ', 'au monde : '),
    ('le cœur — et aucune chirurgie', 'le cœur, et aucune chirurgie'),
]
for a, b in EM:
    assert a in t, 'missing: ' + a
    t = t.replace(a, b)

# En dashes only ever appear in content here: spaced separators -> comma,
# everything else (date ranges, station names) -> a plain hyphen.
t = t.replace(' – ', ', ').replace('–', '-')

io.open(P, 'w', encoding='utf-8').write(t)
print('done; remaining em', t.count('—'), 'en', t.count('–'))
