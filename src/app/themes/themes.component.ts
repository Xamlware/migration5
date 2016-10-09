import {  Component, Inject  } from '@angular/core';
import {  DOCUMENT  } from '@angular/platform-browser';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Theme } from '../interfaces/theme';
import { Themes } from '../interfaces/themes';
import { ThemeService } from '../services/theme.service';
import { SettingsService } from '../services/settings.service';
import { Menubar, MenuItem, SelectItem, Dropdown, Button, Dialog, Panel, Accordion, AccordionTab, UIChart, Calendar   } from 'primeng/primeng'

@Component({
  
  templateUrl: './themes.component.html',
})

export class ThemesComponent {
  themes: Themes = new Themes();
  themeForm: FormGroup;
  themesForm: FormGroup;
  //themesArray: Theme[];
  selectedTheme: string;
  themesList: SelectItem[] = [];
  display: boolean = false;
  data: any;
  private items: MenuItem[];
  dateValue: string = "7/5/2016";

  constructor(private themeService: ThemeService,
    private ss: SettingsService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    var us = this.ss.getUserSettings();
    var theme = (us  && us.theme != null && us.theme != undefined && us.theme != "" ? us.theme : 'Black-Tie');

    this.themeForm = this.fb.group({
      theme: [theme, []]
    });

    this.themesForm = this.fb.group({
      theme: ['', []],
      calendar: ['', []]
    });


    this.themeService.getThemes().forEach(t => this.themesList.push({ label: t.name, value: t.name }));

    this.themeService.setTheme(theme)

    this.items = [
      {
        label: 'Home'
      },
      {
        label: 'Documents'
      },
      {
        label: 'Themes'
      },
      {
        label: 'About'
      }];
  }

  onThemeSelect() {
    this.selectedTheme = this.themeForm.controls['theme'].value;
    this.themeService.setTheme(this.selectedTheme);
  }


  setTheme() {
    var us = this.ss.getUserSettings();
    us.theme = this.selectedTheme;
    
    if (us != undefined && us.theme != null && us.theme != "") {
      this.ss.updateProfileInformation(us);
    }
  }
}
