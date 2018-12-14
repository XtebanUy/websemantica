import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YasqeEditorComponent } from './yasqe-editor.component';

describe('YasqeEditorComponent', () => {
  let component: YasqeEditorComponent;
  let fixture: ComponentFixture<YasqeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YasqeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YasqeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
