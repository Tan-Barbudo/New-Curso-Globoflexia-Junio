import { before, after, test } from 'node:test';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
let env;
const projectId = 'demo-aprende-tan';
const profile = (status = 'approved', role = 'student', extra = {}) => ({status, role, ...extra});
const progress = (completedLessons = []) => ({username:'Alumno', joinedDate:'26/11/2026', completedLessons, favoriteLessons:[], updatedAt:serverTimestamp()});
const db = uid => env.authenticatedContext(uid, {email:uid+'@example.test', email_verified:true}).firestore();
before(async () => {
  env = await initializeTestEnvironment({projectId, firestore:{rules:readFileSync('firestore.rules','utf8')}});
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async ctx => {
    const d = ctx.firestore();
    for (const [uid, value] of Object.entries({legacy:profile(), other:profile(), restricted:profile('approved','student',{courseAccess:['malabarismo']}), pending:profile('pending'), admin:profile('approved','admin')})) {
      await setDoc(doc(d,'users',uid), value);
    }
    await setDoc(doc(d,'progress','legacy'),progress(['intro']));
    await setDoc(doc(d,'progress','restricted'),progress(['intro']));
  });
});
after(async () => { if (env) await env.cleanup(); });
test('anonymous and pending cannot read progress', async () => {
  await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'progress','legacy')));
  await assertFails(getDoc(doc(db('pending'),'progress','pending')));
});
test('legacy students retain access and can advance sequentially', async () => {
  const ref = doc(db('legacy'),'progress','legacy');
  await assertSucceeds(getDoc(ref));
  await assertFails(updateDoc(ref,{completedLessons:['intro','mod-2'],updatedAt:serverTimestamp()}));
  await assertFails(updateDoc(ref,{completedLessons:['intro','mod-1','mod-2'],updatedAt:serverTimestamp()}));
  await assertSucceeds(updateDoc(ref,{completedLessons:['intro','mod-1'],updatedAt:serverTimestamp()}));
  await assertFails(deleteDoc(ref));
});
test('students cannot read peers or grant themselves permissions', async () => {
  await assertFails(getDoc(doc(db('other'),'progress','legacy')));
  await assertFails(updateDoc(doc(db('restricted'),'users','restricted'),{courseAccess:['globoflexia']}));
});
test('restricted student retains history but cannot advance restricted course', async () => {
  const ref = doc(db('restricted'),'progress','restricted');
  await assertSucceeds(getDoc(ref));
  await assertFails(updateDoc(ref,{completedLessons:['intro','mod-1'],updatedAt:serverTimestamp()}));
  await assertSucceeds(updateDoc(ref,{completedLessons:['intro','malabarismo-intro'],updatedAt:serverTimestamp()}));
});
test('new students cannot seed arbitrary completed lessons', async () => {
  const ref = doc(db('other'),'progress','other');
  await assertFails(setDoc(ref,progress(['bonus-4'])));
  await assertSucceeds(setDoc(ref,progress()));
});
test('admin can assign valid permissions but not unknown courses', async () => {
  const ref = doc(db('admin'),'users','restricted');
  await assertFails(updateDoc(ref,{courseAccess:['unknown']}));
  await assertSucceeds(updateDoc(ref,{courseAccess:['globoflexia']}));
});
