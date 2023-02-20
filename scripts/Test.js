import { Database, ExtendedDatabase } from './Database.js';
import { world, system } from '@minecraft/server';

const db = new Database('YaMyItsName2');
world.events.beforeChat.subscribe( async eventData=>{
    if(!eventData.message.startsWith('-')) return;
    eventData.cancel = true;
    const {onScreenDisplay} = eventData.sender;
    const t = new Date();
    let n = "";
    const random = Math.random().toFixed(1);
    switch (eventData.message.toLowerCase()) {
        case "-deleteall":
            for (const [key,value] of db) db.delete(key);
            break;
        case '-clear':
            db.clear();
            break;
        case '-add':
            for (let i = 0; i < 50; i++) db.set('RandomKey: ' + random,'SomeAditionalText ya its true.');
            break;
        case '-get':
            for (let i = 0; i < 50; i++) db.get('RandomKey: ' + random);
            break;
        case '-load':
            for (let i = 0; i < 50; i++) db.loadAll();
            break;
        case '-foreach':
            for (let i = 0; i < 50; i++) for (const [key,value] of db.entriesAll()) n = v;
            break;
        case '-keys':
            for (let i = 0; i < 50; i++) for (const v of db.keysAll()) n = v;
            break;
        case '-values':
            for (let i = 0; i < 50; i++) for (const v of db.valuesAll()) n = v;
            break;
        case "-test": {
            world.say("start")
            world.say(`1 - ${random}`)
            db.set("test", random);
            world.say(`2 - ${db.get("test")}`);
            setTimeout(() => world.say(`3 - ${db.get("test")}`), 20);
            break;
        }
        case "-testasync": {
            world.say("start")
            world.say(`1 - ${random}`)
            await db.setAsync("test", random).catch(console.error);
            world.say(`2 - ${db.get("test")}`);
            setTimeout(() => world.say(`3 - ${db.get("test")}`), 20);
            break;
        }
        default:
            console.warn('InvalidCommand');
            break;
    }
    console.warn('Perform: ' + (new Date() - t) + 'ms');
    eventData.cancel = true;
});

const setTimeout = (callback, ticks = 1) => {
    const interval = system.runSchedule(() => {
        callback();
        system.clearRunSchedule(interval);
    }, ticks);
}