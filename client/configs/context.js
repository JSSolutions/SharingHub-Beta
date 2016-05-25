import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { Bert } from 'meteor/themeteorchef:bert';

export default function () {
  return {
    Meteor,
    FlowRouter,
    ReactiveDict,
    Tracker,
    Bert,
  };
}
