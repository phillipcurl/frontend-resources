module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const scheduler = new Nodal.Scheduler();

  /* generator: begin imports */

  const DummyTask = Nodal.require('tasks/dummy_task.js');
  const CrawlerTask = Nodal.require('tasks/crawler_task.js');
  const CrawlerTask2 = Nodal.require('tasks/crawler_task_2.js');
  const CrawlerTask3 = Nodal.require('tasks/crawler_task_3.js');
  const CrawlerTask4 = Nodal.require('tasks/crawler_task_4.js');

  /* generator: end imports */

  /* generator: begin tasks */

  // scheduler.hourly(30).perform(DummyTask);
  // scheduler.minutely(0).perform(CrawlerTask);
  // scheduler.minutely(10).perform(CrawlerTask2);
  // scheduler.minutely(20).perform(CrawlerTask3);
  // scheduler.minutely(30).perform(CrawlerTask4);

  /* generator: end tasks */


  return scheduler;

})();
