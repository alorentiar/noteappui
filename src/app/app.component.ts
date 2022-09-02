import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'notesappui';
  public notes: Note[];

  constructor(private noteService : NoteService) { }

  ngOnInit(): void {
      this.getNotes();
  }

  public getNotes():void{
    this.noteService.getNotes().subscribe(
      (response: Note[]) => {
        this.notes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(note: Note, mode: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','addNoteModal');
    }
    if (mode === 'edit'){
      button.setAttribute('data-target','addNoteModal');
    }
    if (mode === 'delete'){
      button.setAttribute('data-target','addNoteModal');
    }
  }
}
