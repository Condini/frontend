import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadpersonComponent } from './readperson.component';

describe('ReadpersonComponent', () => {
  let component: ReadpersonComponent;
  let fixture: ComponentFixture<ReadpersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadpersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
