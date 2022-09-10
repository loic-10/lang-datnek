import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Level } from '../../shared/interfaces/level';
import { Modal } from 'bootstrap';
import { StatusModal } from '../../shared/interfaces/status-modal';

@Component({
  selector: 'lang-detail',
  templateUrl: './detail-language.component.html',
  styleUrls: ['./detail-language.component.scss'],
})
export class DetailLanguageComponent implements OnInit, AfterViewInit, Modal {
  @ViewChild('detailLanguageModalRef') detailLanguageModalRef!: ElementRef;
  @Output() modalStateHandler: EventEmitter<StatusModal> =
    new EventEmitter<StatusModal>();
  detailLanguageModal!: Modal;
  levelLanguage!: Level;
  constructor() {}

  ngAfterViewInit(): void {
    this.detailLanguageModal = new Modal(
      this.detailLanguageModalRef.nativeElement
    );
  }

  toggle(levelLanguage: any): void {
    this.levelLanguage = levelLanguage;
    this.detailLanguageModal.toggle();
    this.modalStateHandler.emit('open');
  }

  show(levelLanguage: any): void {
    this.levelLanguage = levelLanguage;
    this.detailLanguageModal.show();
    this.modalStateHandler.emit('open');
  }

  hide(): void {
    this.detailLanguageModal.hide();
    this.modalStateHandler.emit('close');
  }

  handleUpdate(): void {
    this.detailLanguageModal.handleUpdate();
  }

  dispose(): void {
    this.detailLanguageModal.dispose();
    this.modalStateHandler.emit('close');
  }

  ngOnInit(): void {}
}
