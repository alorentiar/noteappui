import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  public onAddNote(addForm: NgForm): void{
    document.getElementById('add-employee-form').click();
    this.noteService.addNote(addForm.value).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateNote(note : Note): void{
    this.noteService.updateNote(note).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteNote(noteId : number): void{
    this.noteService.deleteNote(noteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNotes();
      }
    )
  }

  public searchNotes(key: string): void{
    console.log(key);
    const results: Note[] = [];
    for (const note of this.notes){
      results.push(note);
    }

    this.notes= results;
    if(results.length === 0 || key){
      this.getNotes();
    }
  }

  public onOpenModal(note: Note, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','#addNoteModal');
    }
    if (mode === 'edit'){
      button.setAttribute('data-target','#updateNoteModal');
    }
    if (mode === 'delete'){
      button.setAttribute('data-target','#deleteNoteModal');
    }

    container.appendChild(button);
    button.click();
  }
}
