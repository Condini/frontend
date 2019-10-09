import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepersonComponent } from './updateperson.component';

describe('UpdatepersonComponent', () => {
  let component: UpdatepersonComponent;
  let fixture: ComponentFixture<UpdatepersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
