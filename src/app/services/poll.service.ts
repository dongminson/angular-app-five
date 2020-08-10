import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Poll } from '../models/poll.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducers/app.reducer';
import * as AppAction from '../actions/poll.action';
import { Subscription, from } from 'rxjs';
import { notEmpty } from '../utils/app.utils';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class PollService {
  private fbSubs: Subscription[] = [];
  constructor(
    private db: AngularFirestore, 
    private alertService: AlertService,
    private store: Store<{app: fromApp.State}>
  ) {}

  getPolls() {
    this.store.dispatch(new AppAction.StartLoading());
    this.fbSubs.push(this.db.collection('polls')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc:any) => {
            return {
              id: doc.payload.doc.id,
              author: doc.payload.doc.data().author,
              question: doc.payload.doc.data().question,
              answers: doc.payload.doc.data().answers,
              results: doc.payload.doc.data().results,
              users: doc.payload.doc.data().users,
              
            };
          });
        })
      ).subscribe((polls: Poll[]) => {
        this.store.dispatch(new AppAction.SetPolls(polls));
      },(err) => {
        this.alertService.handleError(err);
      }
    ));
  }

  createPoll(poll:Poll) {
    const newId = this.db.createId();
    return from(
      this.db
        .collection('polls')
        .doc(newId)
        .set({...poll, id: newId})
    );
    
  }

  updatePoll(poll:Poll) {
    return from(
      this.db
        .collection('polls')
        .doc(poll.id)
        .set(poll, { merge: false })
    );
  }

  deletePoll(id:string) {
    return from(
      this.db
        .collection('polls')
        .doc(id)
        .delete()
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  validatePoll(poll:Poll) {
    if (!notEmpty(poll.question)) {
      this.alertService.handleError({message: 'Title cannot be empty.'});
      return false;
    }
    for(let answer of poll.answers) {
      if (!notEmpty(answer)) {
        this.alertService.handleError({message: 'Answer cannot be empty.'});
        return false;
      }
    }
    if(poll.answers.length === 1) {
      this.alertService.handleError({message: 'You need to define at least 2 answers.'});
      return false;
    }
    return true;
  }
}