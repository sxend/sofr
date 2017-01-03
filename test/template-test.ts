import test from 'ava';

import {template} from '../lib/template';

test(t => {
    t.deepEqual(template(""), "");
});
test(t => {
    t.deepEqual(template("<div></div>"), "<div></div>");
});
